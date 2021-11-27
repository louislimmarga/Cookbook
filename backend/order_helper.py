import token_helper
from error import AccessError

def check_order_exist(order_id, orders):
    ''' check if order exist or not '''
    result = orders.find_one({"_id":order_id})
    if (result is None):
        raise AccessError(description="Order does not exist")

def check_permission(token, order_id, users, orders):
    ''' Check if the token ownder has permission to view the given order_id '''
    user = users.find_one({"token":token})
    order = orders.find_one({"_id":order_id})
    
    # The token owner should be either admin or the user that made the order
    if token_helper.check_admin(token, users) or order['user_id'] == str(user["_id"]):
        return True
    return False
    