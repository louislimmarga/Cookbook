import database
import token_helper

def reward_balance(token):
    ''' View a profile '''
    # Retrieve the data from the database
    users = database.get_users()

    # check if the token is valid
    token_helper.is_token_valid(token, users)

    # User info
    user = users.find_one({"token":token})

    return {
        "balance":user["reward"]
    }