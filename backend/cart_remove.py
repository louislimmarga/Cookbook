from error import AccessError
import token_helper
import database

def cart_remove(token, recipe_id, item):
    ''' Remove item (only one) from shopping cart '''
    # Retrieve data from the database
    users = database.get_users()
    carts = database.get_carts()

    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # Find the corresponding cart
    user = users.find_one({"token":token})
    cart = carts.find_one({"user_id":str(user['_id'])})

    # Find the corrsponding recipe section in the cart
    retrieve_recipe = None
    for recipe in cart['recipe_list']:
        if recipe['recipe_id'] == recipe_id:
            # Find the corresponding ingredient in the cart
            retrieve_ingredient = None
            for ingredient in recipe['ingredients']:
                if ingredient['_id'] == item:
                    retrieve_ingredient = ingredient

            # Raise error If the ingredient is not found
            if retrieve_ingredient == None:
                raise AccessError(description="ingredient not found")

            # Remove the ingerdient from that section
            recipe['ingredients'].remove(retrieve_ingredient)
            retrieve_recipe = recipe
    # If the recipe is nto found
    if retrieve_recipe == None:
        raise AccessError(description="recipe not found")

    # If recipe section is empty, then the entry is deleted
    if not len(retrieve_recipe['ingredients']):
        cart['recipe_list'].remove(retrieve_recipe)
    # Update the cart in the database
    carts.update_one({"_id": cart['_id']}, {"$set": {"recipe_list": cart['recipe_list']}})
    # If the shopping cart is empty, then the entry is deleted
    if not len(cart['recipe_list']):
        carts.delete_one({"user_id":str(user['_id'])})

################## testing ##################
# cart_remove('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMTQgMTg6MjU6MTMuOTg0NjQwIiwicmFuZG9tbnVtYmVyIjoiMC4wOTQ5MDE4NzY5NDIzODk5NCJ9.KOPaEQdX8yVPy5Zr2CLQtOaFnzUFBepJVa9dLRLjS3w', "61833fa81f805c540f9562fd","123")