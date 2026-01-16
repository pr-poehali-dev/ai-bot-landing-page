import json
import os
import urllib.request
import urllib.parse

def handler(event: dict, context) -> dict:
    '''Отправка заявок с формы в Telegram группу'''
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

    # Получаем данные из формы
    body = json.loads(event.get('body', '{}'))
    name = body.get('name', 'Не указано')
    phone = body.get('phone', 'Не указан')
    message = body.get('message', '')

    # Получаем настройки Telegram
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')

    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': False, 'error': 'Telegram not configured'})
        }

    # Формируем красивое сообщение
    telegram_message = f"""🚀 <b>Новая заявка с сайта!</b>

👤 <b>Имя:</b> {name}
📱 <b>Телефон:</b> {phone}"""

    if message:
        telegram_message += f"\n💬 <b>Сообщение:</b> {message}"

    # Отправляем в Telegram
    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': telegram_message,
        'parse_mode': 'HTML'
    }).encode('utf-8')

    req = urllib.request.Request(url, data=data, method='POST')
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            
            if result.get('ok'):
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True})
                }
            else:
                return {
                    'statusCode': 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': False, 'error': 'Telegram API error'})
                }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': False, 'error': str(e)})
        }
