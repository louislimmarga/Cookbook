import database
import token_helper

def cart_clean(token):
    ''' Clean the cart '''
    # Retrieve data from the database
    users = database.get_users()
    carts = database.get_carts()

    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # Find the user
    user = users.find_one({"token":token})
    
    # Remove shopping cart from database
    carts.delete_one({"user_id":str(user['_id'])})

################## testing ##################
# token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTAtMTYgMDQ6MDg6MDUuOTY5OTUwIiwicmFuZG9tbnVtYmVyIjoiMC44NTEyMzMzMDIyOTU1MjE5In0.FjeiR2yI0O7fNtvRAXNCCVaMRGqyPvDs1GQIWy4y8-c"
# cart_clean(token)
