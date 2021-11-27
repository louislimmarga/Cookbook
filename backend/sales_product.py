import database
import token_helper
from error import AccessError

def sales_product(token, product_id):
    ''' Return total sales of a product '''
    # Verify user
    users = database.get_users()
    token_helper.is_token_valid(token, users)
    user = users.find_one({"token": token})
    
    # Check if the user is an admin
    if not user['admin']:
        raise AccessError(description="The user does not have permission")

    # If orders is not specified, it assigns the one from database
    orders = database.get_orders()

    total = 0
    for order in orders.find():
        recipes = order["details"]
        for recipe in recipes:
            ingredients = recipe["recipe_ingredients"]
            for ingredient in ingredients:
                if ingredient["_id"] == product_id:
                    total += ingredient["subtotal"]

    # Check if product has been sold before
    if (total == 0):
        raise AccessError(description="No sales have been registered for this product")

    total = "{:.2f}".format(total)
    return {
        "sales_total": total
    }

'''
# Testing
token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMDkgMjE6NDA6MDUuMjEzMjQyIiwicmFuZG9tbnVtYmVyIjoiMC43OTEyODU1NTU1OTc4NjQ2In0.Fixc1v0ehApZBMXzWpOpkexLLzCRR2R3wb_1yA1YqHg"
product_id = "618b5044ce6dbf9e88fd2cd7"
print(sales_product(token, product_id))
'''