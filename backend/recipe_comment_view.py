import database
from bson.objectid import ObjectId

def recipe_comment_view(recipe_id):
    ''' view comment of the given comment_id '''
    # Retrieve data from the database
    recipes = database.get_recipes()
    recipe = recipes.find_one({"_id":ObjectId(recipe_id)})
    recipe_list = recipe['comment']
    recipe_list.reverse()
    # Return the comments of the recipe
    return {
        "comments":recipe_list
    }

################## testing ##################
# recipe_comment_view("61822a0c5ac1298dfea87153")