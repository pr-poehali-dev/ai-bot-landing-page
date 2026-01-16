import json
import os
import requests
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''API для встроенного Telegram чата на сайте'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    if not bot_token:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Bot token not configured'})
        }
    
    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'sendMessage':
                chat_id = body.get('chatId')
                message = body.get('message', '')
                
                if not chat_id or not message:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'chatId and message are required'})
                    }
                
                url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
                response = requests.post(url, json={
                    'chat_id': chat_id,
                    'text': message,
                    'parse_mode': 'HTML'
                })
                
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
                            'error': response.text
                        })
                    }
            
            elif action == 'getUpdates':
                offset = body.get('offset', 0)
                url = f'https://api.telegram.org/bot{bot_token}/getUpdates'
                response = requests.post(url, json={
                    'offset': offset,
                    'timeout': 30,
                    'allowed_updates': ['message']
                })
                
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
                            'error': response.text
                        })
                    }
            
            elif action == 'getBotInfo':
                url = f'https://api.telegram.org/bot{bot_token}/getMe'
                response = requests.get(url)
                
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
                            'error': response.text
                        })
                    }
            
            else:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Invalid action'})
                }
                
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': str(e)})
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'})
    }
