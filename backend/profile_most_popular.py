import database
from bson.objectid import ObjectId
from error import AccessError
import auth_helper

def profile_most_popular(user_id):
    ''' Return the most popular recipe of a user '''
    # Retrieve the data from the database
    users = database.get_users()
    recipes = database.get_recipes()
    # Check if the user id is valid
    if not auth_helper.check_user_id(ObjectId(user_id), users):
        raise AccessError(description="User does not exist")

    # Find the recipe of the user
    user_recipes = recipes.find({"owner_id":user_id})

    max_rating = 0
    popular_recipe = None
    # Iterate through the recipes
    for recipe in user_recipes:
        rating = 0
        counter = 0
        # Calculate the average rating
        for comment in recipe['comment']:
            rating += int(comment['rating'])
            counter += 1
        if counter == 0:
            rating = 0
        else:
            rating = rating/counter
        
        # Update the field if find a recipe with higher rating
        if rating >= max_rating:
            max_rating = rating
            popular_recipe = recipe
    
    # If the user has not uploaded any recipe
    if popular_recipe == None:
        recipe_id = None
    else:
        recipe_id = str(popular_recipe['_id'])
    
    # Return the recipe id of the most popular one
    return {
        "recipe_id":recipe_id
    }

    