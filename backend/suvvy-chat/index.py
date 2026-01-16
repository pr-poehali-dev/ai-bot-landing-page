import json
import os
from suvvyapi import Suvvy, Message

def handler(event: dict, context) -> dict:
    '''API для общения с чат-ботом Suvvy'''
    method = event.get('httpMethod', 'POST')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
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

    # Используем официальную библиотеку Suvvy
    try:
        suvvy = Suvvy(suvvy_token)
        
        # Для первого сообщения используем predict без истории
        if not session_id:
            response = suvvy.predict(Message(text=user_message))
            history_id = response.history_id if hasattr(response, 'history_id') else f'chat-{user_phone}'
        else:
            # Для последующих используем историю
            try:
                history = suvvy.as_history(session_id)
                response = history.predict_add_message(Message(text=user_message))
                history_id = session_id
            except:
                # Если истории не существует, создаём новую
                response = suvvy.predict(Message(text=user_message))
                history_id = response.history_id if hasattr(response, 'history_id') else session_id
        
        bot_response = response.text if hasattr(response, 'text') else str(response)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'response': bot_response,
                'session_id': history_id
            })
        }
            
    except Exception as e:
        print(f'Suvvy error: {str(e)}')
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'response': 'Спасибо за сообщение! Наш менеджер свяжется с вами в ближайшее время.',
                'session_id': session_id
            })
        }