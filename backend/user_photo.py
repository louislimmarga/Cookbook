import database
from bson.objectid import ObjectId
import auth_helper
from error import AccessError
def user_photo(user_id):
    ''' Return user photo '''
    # Retrieve data from the database
    users = database.get_users()

    if user_id == "null":
        raise AccessError(description="user id is null")

    # Validate user
    if not auth_helper.check_user_id(ObjectId(user_id), users):
        raise AccessError(description="User does not exist")

    user = users.find_one({"_id":ObjectId(user_id)})

    # Return user photo
    return {
        "photo":user['photo']
    }
