import database
import token_helper
import auth_helper
from bson.objectid import ObjectId
from error import AccessError

def user_unfollow(token, user_id):
    ''' Unfollow a user '''
    # Retrieve data from the database
    users = database.get_users()
    # check if the token is valid and find the user
    token_helper.is_token_valid(token, users)

    user = users.find_one({"token":token})
    
    # Validate user
    if not auth_helper.check_user_id(ObjectId(user_id), users):
        raise AccessError(description="User does not exist")
    
    # Unfollow the user
    following = user['following']
    user_followed = users.find_one({"_id":ObjectId(user_id)})
    number = user_followed['follower'] - 1
    if number <= 0:
        number = 0
    users.update_one({"_id":user_followed['_id']}, {"$set":{"follower":number}})
    if user_id in following:
        following.remove(user_id)
    users.update_one({"_id":user['_id']}, {"$set":{"following":following}})