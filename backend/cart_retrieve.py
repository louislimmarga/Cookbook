from error import AccessError
from bson.objectid import ObjectId
import token_helper
import database

def cart_retrieve(token):
    ''' Retrieves ingredients and total from the shopping cart '''
    # Retrieve data from the database
    users = database.get_users()
    carts = database.get_carts()
    products = database.get_products()

    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # Retrieve cart from database
    user = users.find_one({"token":token})
    cart = carts.find_one({"user_id":str(user['_id'])})

    section_list = []
    total = 0
    # If cart exists, it will return the list of ingredients. Otherwise, raise error
    if (cart is not None):
        # Iterate through each recipe
        recipes = cart["recipe_list"]
        for recipe in recipes:
            recipe_total = 0
            recipe_list = []
            # Iterate through each ingredient
            for ingredient in recipe['ingredients']:
                product = products.find_one({"_id": ObjectId(ingredient["_id"])})
                subtotal = product["price"] * ingredient["quantity"]

                # Add the subtotal
                total += subtotal
                recipe_total += subtotal

                # Append the product to the list
                product_return = {
                    "_id":str(product['_id']),
                    "title":product['title'],
                    "photo":product['photo'],
                    "description":product['description'],
                    "price":product['price'],
                    "quantity":ingredient["quantity"],
                    "subtotal":subtotal,
                }
                recipe_list.append(product_return)

            # append the recipe section to the list
            section_list.append({"recipe_id":recipe['recipe_id'], "recipe_ingredients":recipe_list,"recipe_subtotal":recipe_total})
    else:
        raise AccessError(description="No cart for this user")

    # return the cart detail and total
    return {
        'section_list': section_list,
        'total': total
    }

################## testing ##################
# print(cart_retrieve('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMTQgMTg6MjU6MTMuOTg0NjQwIiwicmFuZG9tbnVtYmVyIjoiMC4wOTQ5MDE4NzY5NDIzODk5NCJ9.KOPaEQdX8yVPy5Zr2CLQtOaFnzUFBepJVa9dLRLjS3w'))