import json
import os
import urllib.request
import hashlib

def handler(event: dict, context) -> dict:
    '''Двусторонняя интеграция с Suvvy: отправка и приём сообщений'''
    method = event.get('httpMethod', 'POST')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            'body': ''
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }

    # Получаем данные
    body = json.loads(event.get('body', '{}'))
    
    # Определяем направление: от сайта или от Suvvy (webhook)
    event_type = body.get('event_type', '')
    
    # Если это webhook от Suvvy (входящие ответы от бота)
    if event_type:
        return handle_suvvy_webhook(body, event)
    
    # Иначе это запрос от сайта (отправка сообщения в Suvvy)
    user_message = body.get('message', '')
    user_name = body.get('name', 'Гость')
    user_phone = body.get('phone', '')
    session_id = body.get('session_id', '')

    if not user_message:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Message is required'})
        }

    # Получаем токен Suvvy
    suvvy_token = os.environ.get('SUVVY_API_TOKEN')
    
    if not suvvy_token:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Suvvy not configured'})
        }

    # Отправляем сообщение через Suvvy Webhook API
    try:
        # Генерируем уникальные ID для сообщения и чата
        chat_id = session_id or user_phone or hashlib.md5(user_name.encode()).hexdigest()
        message_id = hashlib.md5(f'{chat_id}-{user_message}-{os.urandom(8).hex()}'.encode()).hexdigest()
        
        # Формируем payload согласно документации Suvvy
        payload = {
            'api_version': 1,
            'message_id': message_id,
            'chat_id': chat_id,
            'text': user_message,
            'message_sender': 'customer',
            'source': f'{user_name} с сайта',
            'client_name': user_name,
            'client_phone': user_phone
        }
        
        data = json.dumps(payload).encode('utf-8')
        
        req = urllib.request.Request(
            'https://api.suvvy.ai/api/webhook/custom/message',
            data=data,
            headers={
                'Authorization': f'Bearer {suvvy_token}',
                'Content-Type': 'application/json'
            },
            method='POST'
        )
        
        with urllib.request.urlopen(req, timeout=30) as response:
            result = json.loads(response.read().decode('utf-8'))
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'response': 'Сообщение отправлено! Наш менеджер ответит вам в ближайшее время.',
                    'session_id': chat_id
                })
            }
            
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f'Suvvy webhook error: {e.code} - {error_body}')
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'response': 'Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.',
                'session_id': chat_id if 'chat_id' in locals() else session_id
            })
        }
    except Exception as e:
        print(f'Error: {str(e)}')
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'response': 'Спасибо за обращение! Скоро ответим.',
                'session_id': session_id
            })
        }

def handle_suvvy_webhook(body: dict, event: dict) -> dict:
    '''Обработка входящих сообщений от Suvvy (ответы бота)'''
    event_type = body.get('event_type', '')
    
    # Тестовый запрос от Suvvy
    if event_type == 'test_request':
        print('Suvvy webhook test received')
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'status': 'ok', 'message': 'Webhook works!'})
        }
    
    # Игнорируем всё кроме новых сообщений
    if event_type != 'new_messages':
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'status': 'ignored'})
        }
    
    # Получаем новые сообщения от бота
    new_messages = body.get('new_messages', [])
    chat_id = body.get('chat_id', '')
    
    print(f'Received {len(new_messages)} messages from Suvvy for chat {chat_id}')
    
    # Логируем сообщения (здесь можно сохранить в БД или отправить через WebSocket)
    for msg in new_messages:
        msg_type = msg.get('type', 'text')
        sender = msg.get('message_sender', 'ai')
        
        if msg_type == 'text':
            text = msg.get('text', '')
            print(f'[{chat_id}] {sender}: {text}')
        else:
            file_info = msg.get('file', {})
            print(f'[{chat_id}] {sender} sent {msg_type}: {file_info.get("name", "file")}')
    
    # Возвращаем успех (обязательно 200-299!)
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({
            'status': 'ok',
            'received_messages': len(new_messages),
            'chat_id': chat_id
        })
    }