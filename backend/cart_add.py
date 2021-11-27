import database
import token_helper

def cart_add(token, recipe_id, ingredients):
    ''' Add items to shopping cart'''
    # Retrieve data from the database
    users = database.get_users()
    carts = database.get_carts()

    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # Check if user has shopping cart already
    user = users.find_one({"token":token})
    cart = carts.find_one({"user_id":str(user['_id'])})

    # If shopping cart exists
    if (cart is not None):
        # Check if the recipe id is already in the shopping cart
        retrieve_recipe = None
        for recipe in cart['recipe_list']:
            if recipe['recipe_id'] == recipe_id:
                retrieve_recipe = recipe
                break
        
        # If the recipe id already exists, update directly from it
        if retrieve_recipe != None:
            recipe_ingredients = retrieve_recipe['ingredients']
            # Update each ingredient qty in the cart
            for ingredient in ingredients:
                # Check if the ingredient exists in that recipe id section
                retrieve = False
                # Update the ingredient qty if found
                for recipe_ingredient in recipe_ingredients:  
                    if recipe_ingredient['_id'] == ingredient['_id']:
                        recipe_ingredient['quantity'] += ingredient['quantity']
                        retrieve = True
                # If the ingredient does not exist
                if not retrieve:
                    recipe_ingredients.append(ingredient)

            # Update it to the recipe_list in the cart
            for recipe in cart['recipe_list']:
                if recipe['recipe_id'] == recipe_id:
                    recipe = retrieve_recipe
        # If the recipe does not exist, create a new one
        else:
            retrieve_recipe = dict()
            retrieve_recipe['recipe_id'] = recipe_id
            retrieve_recipe['ingredients'] = ingredients
            cart['recipe_list'].append(retrieve_recipe)
        # Make the update to the database
        carts.update_one({"_id": cart['_id']}, {"$set": {"recipe_list": cart['recipe_list']}})
    # The cart does not exist
    else:
        # Create a new cart and add to the database
        cart = {
            "user_id":str(user['_id']), 
            "recipe_list":[
                {
                    "recipe_id":recipe_id,
                    "ingredients":ingredients
                }
            ]
        }
        carts.insert_one(cart)

################## testing ##################
# cart_add('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMTQgMTg6MjU6MTMuOTg0NjQwIiwicmFuZG9tbnVtYmVyIjoiMC4wOTQ5MDE4NzY5NDIzODk5NCJ9.KOPaEQdX8yVPy5Zr2CLQtOaFnzUFBepJVa9dLRLjS3w', 
# "61833fa71f805c540f9562f4", [{"_id":"61822388cc5920235e3244e7", "quantity":1},{"_id":"618223f6cc5920235e3244ed", "quantity":3}]
# )

################## database structure ##################
'''
cart
{
    user_id: (string)
    recipe_list:[
        {
            recipe_id:(string)
            ingredients:[
                {
                    _id:(string)
                    quantity:(int)
                },
                {
                    _id:(string)
                    quantity:(int)
                }
            ]
        }
    ]
}
'''