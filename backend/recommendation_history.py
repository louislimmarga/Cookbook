import token_helper
import database
from bson.objectid import ObjectId
import recommendation_helper

def recommendation_history(token):
    ''' recommend based on user's account history '''
    # Retrieve data from the database
    users = database.get_users()
    recipes = database.get_recipes()
    
    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # Get the current user
    user = users.find_one({"token":token})

    recipe_bought = user['recipe_bought']
    recipe_bought = list(set(recipe_bought))
    point_assign = dict()
    if recipe_bought == None:
        return {
        "recipe_ids":[]
    }
    # Count how many time each label appear 
    for recipe_id in recipe_bought:
        recipe = recipes.find_one({"_id":ObjectId(recipe_id)})
        if len(recipe['labels']) <= 0:
            continue
        for label in recipe['labels']:
            label = label.lower()
            point_assign[label] = point_assign.get(label, 0) + 1

    recipe_list = list(recipes.find())
    rank_recipe = []

    whole_counter, whole_rating = recommendation_helper.average_all_recipes(recipe_list)

    # Iteratte through the recipes
    for recipe in recipe_list:
        # Add point for each label on the recipe according to how many time the label appears
        point = 0
        if len(recipe['labels']) <= 0:
            continue
        for label in recipe['labels']:
            label = label.lower()
            point += point_assign.get(label, 0)
            point = recommendation_helper.assign_point(recipe, point, whole_counter, whole_rating)
        rank_recipe.append((point, str(recipe['_id'])))
    
    # Sort the recipe according to the point
    rank_recipe.sort(key=lambda x:x[0])
    rank_recipe.reverse()
    final_recipe = []
    
    # Don't recommend the recipe that is already bought
    for recipe in rank_recipe:
        (point, id) = recipe
        if not id in recipe_bought:
            final_recipe.append(id)

    return {
        "recipe_ids":final_recipe
    }

################## testing ##################
# recommendation_history("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMDQgMDM6MzU6NDUuOTIyNDk0IiwicmFuZG9tbnVtYmVyIjoiMC45OTYxNzI4NzEyNDA2MDE0In0.YDxLWksLfp2eZ_CFH761821UG42nCzH28-Snvyw92qo")
