from werkzeug.exceptions import HTTPException

class InputError(HTTPException):
    ''' Input Errors '''
    code = 400
    message = 'No message specified'

class AccessError(HTTPException):
    ''' Access Errors '''
    code = 400
    message = 'No message specified'