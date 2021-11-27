import token_helper
import database

def admin_check(token):
    ''' Check if the user is an admin'''
    # retrieve data from the database
    users = database.get_users()

    # check if the token is valid
    token_helper.is_token_valid(token, users)
    
    # return whether the token owner is an admin
    return {
        "admin":token_helper.check_admin(token, users)
    }