from error import AccessError
import database
import auth_helper
from bson.objectid import ObjectId

def profile_view(token, user_id):
    ''' View a profile '''
    # Retrieve the data from the database
    users = database.get_users()

    # Validate user
    if not auth_helper.check_user_id(ObjectId(user_id), users):
        raise AccessError(description="User does not exist")

    # User info
    user = users.find_one({"_id":ObjectId(user_id)})
    
    username = user['username']
    first_name = user['first_name']
    last_name = user['last_name']
    email = ""
    phone = ""
    follower = user['follower']
    photo = user['photo']
    admin = user['admin']
    address = user['address']
    state = user['state']
    postcode = user['postcode']

    viewing_user = users.find_one({"token": token})
    # Check if viewing own profile
    if viewing_user:
        if viewing_user['_id'] == user['_id']:
            email = user['email']
            phone = user['phone']

    # User recipes
    user_recipes_string = []
    recipes = database.get_recipes()
    user_recipes = recipes.find({"owner_id":user_id})
    whole_rating = 0
    whole_counter = 0
    final_rating = 5
    # Iterate through the recipes
    for recipe in user_recipes:
        rating = 0
        counter = 0
        # Calculate the rating for the recipes
        for comment in recipe['comment']:
            rating += int(comment['rating'])
            counter += 1
        if counter != 0:
            rating = rating/counter
            whole_counter += 1
            whole_rating += rating
        user_recipes_string.append(str(recipe['_id']))

    # If no recipe has rating
    if whole_counter == 0:
        final_rating = 0
    else:
        final_rating = whole_rating/whole_counter

    # Return the info associated with the user 
    return {
        'user_id': user_id,
        'username': username,
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'phone': phone,
        'follower': follower,
        'photo': photo,
        'user_recipes_string': user_recipes_string,
        'average_rating':round(final_rating, 1),
        'admin': admin,
        'address': address,
        'postcode': postcode,
        'state': state,
    }