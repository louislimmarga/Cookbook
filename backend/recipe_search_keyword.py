import database
import re

def recipe_search_keyword(keyword):
    ''' list all the recipes with the given keyword '''
    # Retrieve data from the database
    recipes = database.get_recipes()

    recipe_list = list(recipes.find())
    recipe_ids = []
    # Iterate through the list
    for recipe in recipe_list:
        # Append to the list if matches the keyword
        if re.search(keyword.lower(), recipe['title'].lower()):
            recipe_ids.append(str(recipe['_id']))

    # Return a list of recipe id that matches the keyword
    return {
        "recipe_ids":recipe_ids
    }
