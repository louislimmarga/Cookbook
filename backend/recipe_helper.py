def check_recipe_exist(recipeId, recipes):
    ''' Check if the recipe exist or not '''
    result = recipes.find_one({"_id":recipeId})
    if (result is None):
        return False
    return True