import os
import uuid
import logging

import pika
from bottle import Bottle, request, HTTPResponse
from errors import HTTPError

credentials = pika.PlainCredentials('user', 'password')
parameters = pika.ConnectionParameters('rabbitmq', 5672, '/', credentials=credentials, heartbeat=600)
connection = pika.BlockingConnection(parameters)

channel = connection.channel()
channel.queue_declare(queue='requests', durable=True)

DATA_DIR = '../raw_data'

app = Bottle()

cors_headers={
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
}

@app.post('/api/calculate')
def file_endpoint():
    file = request.files.get('file')
    if file is None:
        raise HTTPError(
            status=400,
            msg="The request should contain a file",
            loc=["body", "file"]
        )
    file_bytes = file.file.read()
    id = uuid.uuid4()
    file_path_raw = os.path.join(DATA_DIR, f'raw_{id}.csv')

    with open(file_path_raw, 'wb') as file:
        file.write(file_bytes)

    channel.basic_publish(exchange='',
                          routing_key='requests',
                          body=str(id))

    response_ = HTTPResponse(
        body=f'result_{id}.csv',
        headers=cors_headers
    )
    logging.info(f'Request {id} sent for processing')
    return response_

@app.error()
def any_error(error):
    return 'Server error'
    
@app.error(404)
def error404(error):
    return 'Not found'

@app.error(405)
def error405(error):
    return ''