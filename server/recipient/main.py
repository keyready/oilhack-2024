import os
import logging

import pika
from utils import processing

DATA_DIR = '../raw_data'
SAVE_DIR = '../media'

credentials = pika.PlainCredentials('user', 'password')
parameters = pika.ConnectionParameters('rabbitmq', 5672, '/', credentials=credentials, heartbeat=600)
connection = pika.BlockingConnection(parameters)

channel = connection.channel()
channel.queue_declare(queue='requests', durable=True)


def callback(ch, method, properties, body):
    request_id = body.decode('utf-8')

    logging.info(f'Request {request_id} accepted for processing')

    path_to_raw=os.path.join(DATA_DIR, f'raw_{request_id}.csv')
    path_to_result=os.path.join(SAVE_DIR, f'result_{request_id}.csv')

    try:
        processing(
            path_to_raw=path_to_raw,
            path_to_result=path_to_result
        )
    except Exception as e:
        logging.warning(f'{request_id}:Processing error\n{e}')
    finally:
        if os.path.exists(path_to_raw):
            os.remove(path_to_raw)

channel.basic_consume(queue='requests', on_message_callback=callback, auto_ack=True)
channel.start_consuming()