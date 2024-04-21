import os
import multiprocessing
import logging

import pika
from utils import processing


envs = os.environ
WORKERS_QUANTITY = int(envs["WORKERS_QUANTITY"])
RABBIT_LOGIN = envs["RABBIT_LOGIN"]
RABBIT_PASSWORD = envs["RABBIT_PASSWORD"]

DATA_DIR = '../raw_data'
SAVE_DIR = '../media'


def main():
    credentials = pika.PlainCredentials(RABBIT_LOGIN, RABBIT_PASSWORD)
    parameters = pika.ConnectionParameters('rabbitmq', 5672, '/', credentials=credentials, heartbeat=600)
    connection = pika.BlockingConnection(parameters)

    channel = connection.channel()
    channel.queue_declare(queue='requests', durable=True)

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='requests', on_message_callback=callback, auto_ack=True)
    channel.start_consuming()


def callback(ch, method, properties, body):
    logging.info(f'Request {properties.message_id} accepted for processing')

    path_to_raw=os.path.join(DATA_DIR, f'raw_{properties.message_id}.csv')
    path_to_result=os.path.join(SAVE_DIR, f'result_{properties.message_id}.csv')

    with open(path_to_raw, 'wb') as file:
        file.write(body)

    try:
        processing(
            path_to_raw=path_to_raw,
            path_to_result=path_to_result
        )
    except Exception as e:
        logging.warning(f'{properties.message_id}:Processing error\n{e}')
    finally:
        if os.path.exists(path_to_raw):
            os.remove(path_to_raw)


if __name__ == '__main__':
    processes = []
    for _ in range(WORKERS_QUANTITY):
        process = multiprocessing.Process(target=main)
        process.start()
        processes.append(process)

    for process in processes:
        process.join()
        