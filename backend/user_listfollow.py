import database
from bson.objectid import ObjectId
import auth_helper
from error import AccessError
def user_listfollow(user_id):
    ''' List the users that user is following '''
    # Retrieve data from the database
    users = database.get_users()

    user = users.find_one({"_id":ObjectId(user_id)})

    # Validate user
    if not auth_helper.check_user_id(ObjectId(user_id), users):
        raise AccessError(description="User does not exist")

    # Return the list of following
    return {
        "following":user['following']
    }
