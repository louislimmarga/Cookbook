import database
import token_helper

def recommendation_user_following(token):
    ''' Recommend based on the user the token owner is following'''
    # Retrieve data from the database
    users = database.get_users()
    recipes = database.get_recipes()
    
    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # Get the current user
    user = users.find_one({"token":token})
    recipe_all = recipes.find()
    # Find all the recipes from currently following users
    recipe_list = []
    user_ids = user['following']
    for following in user_ids:
        for recipe in recipe_all:
            if recipe['owner_id'] == following:
                rating = 0
                counter = 0
                for comment in recipe['comment']:
                    rating += int(comment['rating'])
                    counter += 1
                if counter != 0:
                    rating = counter / rating
                else:
                    rating = 2.5
                recipe_list.append((recipe, rating))

    
    # Sort the recipe according to the point
    recipe_list.sort(key=lambda x:x[1])
    recipe_list.reverse()

    final_recipe = []
    # Don't recommend the recipe that is already bought
    for recipe in recipe_list:
        (recipe_retrieve, rating) = recipe
        if not str(recipe_retrieve['_id']) in user['recipe_bought']:
            final_recipe.append(str(recipe_retrieve['_id']))

    final_recipe = list(set(final_recipe))
    
    # Return the recipe id list
    return {
        "recipe_ids":final_recipe
    }


