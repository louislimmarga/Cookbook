import token_helper
import database
from bson.objectid import ObjectId
from error import AccessError
def recipe_edit(token, recipe_id, title, intro, photo, difficulty, cooktime, preptime, serves, ingredients, steps, labels):
    ''' edit a recipe '''
    # Retrieve data from the database
    users = database.get_users()
    recipes = database.get_recipes()

    # check if the token is valid
    token_helper.is_token_valid(token, users)

    user = users.find_one({"token":token})
    recipe = recipes.find_one({"_id":ObjectId(recipe_id)})

    # Check if the user has permission
    if not (token_helper.check_admin(token, users) or recipe['owner_id'] == str(user['_id'])):
        raise AccessError(description="user does not have permission")

    # update the data in the database
    recipes.update_one({"_id":ObjectId(recipe_id)}, {"$set": {"title":title}})
    recipes.update_one({"_id":ObjectId(recipe_id)}, {"$set": {"intro":intro}})
    recipes.update_one({"_id":ObjectId(recipe_id)}, {"$set": {"photo":photo}})
    recipes.update_one({"_id":ObjectId(recipe_id)}, {"$set": {"difficulty":difficulty}})
    recipes.update_one({"_id":ObjectId(recipe_id)}, {"$set": {"cooktime":cooktime}})
    recipes.update_one({"_id":ObjectId(recipe_id)}, {"$set": {"preptime":preptime}})
    recipes.update_one({"_id":ObjectId(recipe_id)}, {"$set": {"serves":serves}})
    recipes.update_one({"_id":ObjectId(recipe_id)}, {"$set": {"ingredients":ingredients}})
    recipes.update_one({"_id":ObjectId(recipe_id)}, {"$set": {"steps":steps}})
    recipes.update_one({"_id":ObjectId(recipe_id)}, {"$set": {"labels":labels}})

    # return the id of the recipe
    return {
        "recipe_id":recipe_id
    }