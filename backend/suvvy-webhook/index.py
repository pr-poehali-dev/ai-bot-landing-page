import json
import os

def handler(event: dict, context) -> dict:
    '''Webhook для приема ответов от Suvvy AI ассистента'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            'body': ''
        }
    
    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            
            # Suvvy отправляет: chatId, message, userId и другие данные
            chat_id = body.get('chatId')
            message = body.get('message')
            user_id = body.get('userId')
            
            # Логируем полученные данные для отладки
            print(f"Received from Suvvy - chatId: {chat_id}, userId: {user_id}, message: {message}")
            print(f"Full payload: {json.dumps(body)}")
            
            # Здесь будет логика сохранения сообщения в БД или отправки в frontend через WebSocket
            # Пока просто подтверждаем получение
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Webhook received'
                })
            }
            
        except Exception as e:
            print(f"Error processing webhook: {str(e)}")
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': str(e)
                })
            }
    
    if method == 'GET':
        # GET endpoint для проверки работоспособности
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'status': 'active',
                'service': 'Suvvy Webhook Endpoint'
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'error': 'Method not allowed'
        })
    }
