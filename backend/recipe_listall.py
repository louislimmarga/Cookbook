import database

def recipe_listall():
    ''' list all the recipes '''
    # Retrieve data from the database
    recipes = database.get_recipes()
    recipe_list = list(recipes.find())

    # Sort the recipe list according to its sale
    sorted_list = sorted(recipe_list, key=lambda d: d['sold'])
    recipe_list = []
    for recipe in sorted_list:
        recipe_list.append(str(recipe['_id']))
    recipe_list.reverse()

    # Return the sorted list
    return {
        "recipe_list":recipe_list
    }

################## testing ##################
# print(recipe_listall())