import json
from typing import Union

from bottle import HTTPResponse



class HTTPError(HTTPResponse):

    def __init__(self, status: int, msg: str, loc: Union[dict, None] = None):
        body = {"msg": msg}
        if loc is not None:
            body["loc"] = loc
        body = json.dumps(body)
        super(HTTPError, self).__init__(
            body=body, 
            status=status
        )
