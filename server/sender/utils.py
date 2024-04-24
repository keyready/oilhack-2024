import os
import logging
import pika

envs = os.environ
RABBIT_LOGIN = envs["RABBIT_LOGIN"]
RABBIT_PASSWORD = envs["RABBIT_PASSWORD"]


def send_task(id: str, data: bytes):
    credentials = pika.PlainCredentials(RABBIT_LOGIN, RABBIT_PASSWORD)
    parameters = pika.ConnectionParameters('rabbitmq', 5672, '/', credentials=credentials, heartbeat=600)
    connection = pika.BlockingConnection(parameters)

    channel = connection.channel()
    channel.queue_declare(queue='requests', durable=True)

    channel.basic_publish(
        exchange='',
        routing_key='requests',
        body=data,
        properties=pika.BasicProperties(
            message_id=id
        )
    )

    logging.info(f'Request {id} sent for processing')
    connection.close()
