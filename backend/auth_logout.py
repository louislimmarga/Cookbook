from error import AccessError, InputError
import token_helper
import database

def auth_logout(token):
    ''' logout a user '''
    # retrieve data from the database
    users = database.get_users()

    try:
        # check if the token is valid
        if token_helper.is_token_valid(token, users):
            # disable the token and return success
            token_helper.invalidate_token(token, users)
            return {'is_success': True}
    except AccessError:
        # return not success
        return {'is_success': False}
    except:
        raise InputError(description='An unknown error occured invalidating the token')