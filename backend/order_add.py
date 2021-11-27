from error import InputError
import argument_checker
import token_helper
import database
import datetime
import auth_helper
import email_send
import cart_clean
from bson.objectid import ObjectId

def order_add(token, firstname, lastname, email, phone, address, state, postcode, details, total):
    ''' add order to the database '''
    # Retrieve data from the database
    users = database.get_users()
    orders = database.get_orders()
    recipes = database.get_recipes()

    # Check if the arguments are of correct format
    argument_checker.all_not_empty([token, firstname, lastname, email, phone, address, state, postcode])
    argument_checker.no_white_space([token, firstname, lastname, email, phone, state, postcode])

    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # Check if the cart is not empty
    if len(details) <= 0:
        raise InputError(description="The cart is empty")

    # Check if email is of correct format
    if not auth_helper.is_correct_email_format(email):
        raise InputError(description="Wrong Email Format")

    user = users.find_one({"token":token})

    # create the order
    order = {
        "status":"processing",
        "user_id":str(user['_id']),
        "firstname":firstname,
        "lastname":lastname,
        "address":address,
        "state":state,
        "postcode":postcode,
        "email":email,
        "phone":phone,
        "details":details,
        "time":datetime.datetime.strftime(datetime.datetime.now(), "%d/%m/%Y %H:%M"), 
        "total":total
    }

    recipe_bought = user['recipe_bought']
    # Iterate through each recipe
    for recipe in details:
        # Append to the bought recipe
        recipe_bought.append(recipe['recipe_id'])
        # Give the recipe owner reward
        recipe_own = recipes.find_one({"_id":ObjectId(recipe['recipe_id'])})
        user_owner = users.find_one({"_id":ObjectId(recipe_own['owner_id'])})
        # Update the sold field
        newSold = recipe_own['sold'] + 1
        recipes.update_one({"_id": recipe_own['_id']}, {"$set": {"sold":newSold}})
        # Update the reward
        newReward = user_owner['reward'] + recipe['recipe_subtotal'] * 0.05
        users.update_one({"_id": user_owner['_id']}, {"$set": {"reward":newReward}})
    # Update the bought recipe
    users.update_one({"_id": user['_id']}, {"$set": {"recipe_bought":recipe_bought}})

    # insert the order to the database
    result = orders.insert_one(order)
    order_id = str(result.inserted_id)

    # send email with order details to user
    email_send.email_send(details, order_id, email, firstname, address, state, postcode, phone)

    # clean shopping cart
    cart_clean.cart_clean(token)

    # return order_id and token
    return {
        'order_id': order_id,
        'token': token
    }

################## testing ##################
# order_add('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMTQgMTg6MjU6MTMuOTg0NjQwIiwicmFuZG9tbnVtYmVyIjoiMC4wOTQ5MDE4NzY5NDIzODk5NCJ9.KOPaEQdX8yVPy5Zr2CLQtOaFnzUFBepJVa9dLRLjS3w',
# "trina", "chang", "ks12345@gmail.com", "09123", "sdfsfsfsdf", "sdfsdf", "dfsdf", [{'recipe_id': '61833fa71f805c540f9562f4', 'recipe_ingredients': [{'id': '61822388cc5920235e3244e7', 'title': 'chicken breast', 'photo': 'dfdsfsdfsfsfsd', 'description': 'yummy chicken breast', 'price': 1.5, 'quantity': 1, 'subtotal': 1.5}, {'id': '618223f6cc5920235e3244ed', 'title': 'chicken leg', 'photo': 'njlkerwe', 'description': 'yummy chicken leg', 'price': 1, 'quantity': 3, 'subtotal': 3}], 'recipe_subtotal': 4.5}],
# 4.5)


    