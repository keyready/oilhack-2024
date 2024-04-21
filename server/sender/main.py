import uuid

from bottle import Bottle, request, HTTPResponse
from errors import HTTPError
from utils import send_task


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