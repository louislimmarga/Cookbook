import database

def recipe_search_label(label):
    ''' list all the recipes with the given label '''
    # Retrieve data from the database
    recipes = database.get_recipes()

    recipe_list = list(recipes.find())
    recipe_ids = []
    # Iterate through the list
    for recipe in recipe_list:
        # Append if the label matches
        for recipe_label in recipe['labels']:
            if recipe_label.lower() == label.lower():
                recipe_ids.append(str(recipe['_id']))

    # Return the id of the recipes that match the label
    return {
        "recipe_ids":recipe_ids
    }