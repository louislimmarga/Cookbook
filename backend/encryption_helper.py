import hashlib
import random
from datetime import datetime
import jwt
import os

def hash_password(password):
    ''' Returns a hash of tha password as a string '''
    return str(hashlib.sha256(password.encode()).hexdigest())

def generate_token():
    ''' returns a random token string '''
    data = {
        "datetime" : str(datetime.now()),
        "randomnumber" : str(random.random())
    }
    TOKEN_SECRET = str(os.getpid())
    token = str(jwt.encode(data, TOKEN_SECRET, algorithm='HS256'))
    return str(token)

