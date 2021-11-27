import token_helper
import database
from error import AccessError
from bson.objectid import ObjectId

def order_update(token, order_id, status):
    ''' update the order status '''
    # Retrieve data from the database
    users = database.get_users()
    orders = database.get_orders()
    
    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # Check if the user is an admin
    if not token_helper.check_admin(token, users):
        raise AccessError(description="User does not have permission")

    # Update the status
    orders.update_one({"_id": ObjectId(order_id)}, {"$set": {"status": status}})
