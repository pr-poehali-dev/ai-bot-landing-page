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
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            
            chat_id = body.get('chatId')
            message = body.get('message')
            user_id = body.get('userId')
            
            print(f"Received from Suvvy - chatId: {chat_id}, userId: {user_id}, message: {message}")
            print(f"Full payload: {json.dumps(body)}")
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Webhook received'
                }),
                'isBase64Encoded': False
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
                }),
                'isBase64Encoded': False
            }
    
    if method == 'GET':
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'status': 'active',
                'service': 'Suvvy Webhook Endpoint'
            }),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'error': 'Method not allowed'
        }),
        'isBase64Encoded': False
    }