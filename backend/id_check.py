import token_helper
import database

def id_check(token):
    ''' Check if the token is valid and get the id '''
    # Retrieve data from the database
    users = database.get_users()

    # Check if the token is valid
    token_helper.is_token_valid(token, users)
    
    # return the id of the user
    return {
        "id":str(token_helper.find_user_id_from_token(token, users))
    }