import json
import os
import requests

def handler(event: dict, context) -> dict:
    '''API для отправки сообщений в Suvvy AI ассистента'''
    
    method = event.get('httpMethod', 'GET')
    
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
    
    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            
            chat_id = body.get('chatId')
            message = body.get('message')
            user_id = body.get('userId', chat_id)
            
            if not chat_id or not message:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'error': 'chatId and message are required'
                    })
                }
            
            api_token = os.environ.get('SUVVY_API_TOKEN')
            if not api_token:
                return {
                    'statusCode': 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'error': 'SUVVY_API_TOKEN not configured'
                    })
                }
            
            # Отправляем сообщение в Suvvy API
            suvvy_url = 'https://api.suvvy.ai/api/webhook/custom/message'
            
            payload = {
                'chatId': chat_id,
                'userId': user_id,
                'message': message,
                'channel': 'website'
            }
            
            headers = {
                'Authorization': f'Bearer {api_token}',
                'Content-Type': 'application/json'
            }
            
            response = requests.post(suvvy_url, json=payload, headers=headers, timeout=10)
            
            if response.status_code == 200:
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': True,
                        'data': response.json()
                    })
                }
            else:
                return {
                    'statusCode': response.status_code,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'error': f'Suvvy API error: {response.text}'
                    })
                }
                
        except requests.exceptions.Timeout:
            return {
                'statusCode': 504,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': 'Request to Suvvy API timed out'
                })
            }
        except Exception as e:
            print(f"Error: {str(e)}")
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
