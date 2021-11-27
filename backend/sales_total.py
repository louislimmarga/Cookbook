import database
import token_helper
from error import AccessError

def sales_total(token):
    ''' Return total sales '''
    # Verify user
    users = database.get_users()
    token_helper.is_token_valid(token, users)
    user = users.find_one({"token": token})
    
    # Check if the user is an admin
    if not user['admin']:
        raise AccessError(description="The user does not have permission")

    # Check if database is empty
    orders = database.get_orders()

    total = 0
    for order in orders.find():
        total += order["total"]

    # Check if orders have been placed
    if total == 0:
        raise AccessError(description="No orders have been placed yet")

    total = "{:.2f}".format(total)
    return {
        "sales_total": total
    }

'''
# Testing
token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMDkgMjE6NDA6MDUuMjEzMjQyIiwicmFuZG9tbnVtYmVyIjoiMC43OTEyODU1NTU1OTc4NjQ2In0.Fixc1v0ehApZBMXzWpOpkexLLzCRR2R3wb_1yA1YqHg"
print(sales_total(token))
'''
