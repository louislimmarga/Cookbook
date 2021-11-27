import database
import token_helper
import order_helper
from error import AccessError
from bson.objectid import ObjectId
import json

def order_view(token, order_id):
    ''' view the information associated with the order'''
    # Retrieive data from the database
    users = database.get_users()
    orders = database.get_orders()

    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # Check if the order exists
    order_helper.check_order_exist(ObjectId(order_id), orders)

    # Check if the user has permission 
    if not order_helper.check_permission(token, ObjectId(order_id), users, orders):
        raise AccessError(description="Does not have permission to view this order")
    
    # Get the information
    order = orders.find_one({"_id":ObjectId(order_id)})
    user = users.find_one({'_id':ObjectId(order['user_id'])})
    
    # return the order information
    return {
        'order_id': order_id,
        'status': order['status'],
        'username': user['username'],
        'order_time': order['time'],
        'firstname':order['firstname'],
        'lastname':order['lastname'],
        'address': order['address'],
        'state': order['state'],
        'postcode': order['postcode']
    }

################## testing ##################
# order_view("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMDQgMTc6NTc6NTcuNTk3MTk3IiwicmFuZG9tbnVtYmVyIjoiMC4yNTgzNjkxMzU2NTk5OTUifQ.DPov7O0dphMygmiQKvPLhI-KxAYEpnSG8v4BuL0zYSY", '61837e39d78ac7c586089321')
    
    

