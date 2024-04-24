import os
import multiprocessing
import logging

import pika
from utils import processing


envs = os.environ
WORKERS_QUANTITY = int(envs["WORKERS_QUANTITY"])
RABBIT_LOGIN = envs["RABBIT_LOGIN"]
RABBIT_PASSWORD = envs["RABBIT_PASSWORD"]

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

    path_to_result=os.path.join(SAVE_DIR, f'result_{properties.message_id}.csv')

    processing(body, path_to_result)


if __name__ == '__main__':
    processes = []
    for _ in range(WORKERS_QUANTITY):
        process = multiprocessing.Process(target=main)
        process.start()
        processes.append(process)

    for process in processes:
        process.join()
        