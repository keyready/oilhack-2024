import os
import uuid

from bottle import Bottle, request, HTTPResponse
from errors import HTTPError
from utils import send_task

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

    send_task(str(id), file_bytes)

    response_ = HTTPResponse(
        body=str(id),
        headers=cors_headers
    )
    return response_


@app.get('/api/confirm')
def get_result():
    fileId = request.query.fileId

    if "fileId" not in request.query_string or fileId == "":
        raise HTTPError(
            status=400,
            msg="The request should contain a id parameter",
            loc=["params", "fileId"]
        )
    
    path_to_result = os.path.join(SAVE_DIR, f'result_{fileId}.csv')
    if os.path.exists(path_to_result):
        with open(path_to_result, 'rb') as file:
            file_bytes = file.read()

        cors_headers['Content-Type'] = 'text/csv'
        response = HTTPResponse(
            body=file_bytes,
            headers=cors_headers
        )
        os.remove(path_to_result)
    else:
        response = HTTPResponse(
            status=202,
            headers=cors_headers
        )
    return response

@app.error()
def any_error(error):
    return 'Server error'
    
@app.error(404)
def error404(error):
    return 'Not found'

@app.error(405)
def error405(error):
    return ''