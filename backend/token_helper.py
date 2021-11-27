from error import AccessError

def is_token_valid(token, users):
    ''' return True if in use, 
        else raise an AccessError if the token is not owned by anyone '''
    result = users.find_one({"token":token})
    if token == "":
        raise AccessError(description='Invalid token')
    if (result is not None):
        return True
    raise AccessError(description='Invalid token')

def invalidate_token(token, users):
    ''' Invalidates a token by setting user token to None '''
    user = users.find_one({"token":token})
    users.update_one({"_id": user['_id']}, {"$set": {"token": ""}})

def check_admin(token, users):
    ''' check if the token is own by admin'''
    user = users.find_one({"token":token})
    if user['admin']:
        return True
    return False

def find_user_id_from_token(token, users):
    ''' returns user id from token '''
    user = users.find_one({"token": token})
    if token == "":
        raise AccessError(description='Invalid token')
    if (user is None):
        raise AccessError(description='Invalid token')
    return user['_id']