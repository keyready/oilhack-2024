import os
import uuid
import logging

from bottle import Bottle, request, HTTPResponse
from errors import HTTPError
from utils import processing

DATA_DIR = '../data'
SAVE_DIR = '../media'

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
    file_path_processed = os.path.join(DATA_DIR, f'processed_{id}.csv')
    file_path_result = f'{SAVE_DIR}/result_{id}.csv'

    with open(file_path_raw, 'wb') as file:
        file.write(file_bytes)

    try:
        # processing(file_path_raw, file_path_processed)
        # test
        processing(file_path_raw, file_path_result)
    except Exception as e:
        logging.warning("%s#%s", id, e)
        if os.path.exists(file_path_processed):
            os.remove(file_path_processed)
        raise HTTPError(
            status=422,
            msg="Incorrect file format",
            loc=["body", "file"]
        )
    finally:
        if os.path.exists(file_path_raw):
            os.remove(file_path_raw)

    response_ = HTTPResponse(
        body=f'result_{id}.csv',
        headers=cors_headers
    )

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