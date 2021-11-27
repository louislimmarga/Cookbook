import argument_checker
import token_helper
import database
from error import InputError

def recipe_upload(token, title, intro, photo, difficulty, cooktime, preptime, serves, ingredients, steps, labels):
    ''' upload a recipe '''
    # Retrieve data from the database
    users = database.get_users()
    recipes = database.get_recipes()

    # check if the token is valid
    token_helper.is_token_valid(token, users)

    # check if the fields have arguments
    argument_checker.all_not_empty([title, intro, photo])
    
    # check if no input
    if (difficulty is None) or (cooktime is None) or (preptime is None) or (serves is None):
        raise InputError(description="no input for any of diffculty/cooktime/preptime/serves")

    # no empty step
    argument_checker.all_not_empty(steps)

    # Iterate through the ingredient list and check if it's valid
    for ingredient in ingredients:
        if argument_checker.is_empty_string(ingredient['ingredient']):
            raise InputError(description="contains empty ingredient textfield")

    user = users.find_one({"token":token})
    owner_id = str(user['_id'])

    # Add the recipe to the database
    recipe = {
        "title":title,
        "intro":intro,
        "photo":photo,
        "sold":0,
        "difficulty":difficulty,
        "rating":0,
        "people_rated":0,
        "owner_id":owner_id,
        "cooktime":cooktime,
        "preptime":preptime,
        "serves":serves,
        "ingredients": ingredients,
        "steps":steps,
        "comment":[], 
        "labels":labels
    }
    result = recipes.insert_one(recipe)

    # return the recipe id
    return {
        'recipe_id': str(result.inserted_id)
    }

################## testing ##################
# users = database.get_users()
# user = users.find_one({"username":"TrinaChang"})

# recipe_upload(
#     user['token'], 'popular recipe', 'dfsfsd', 'sfssd', 5, 30, 20, 4, 
#     [{'ingredient':'dfsfsdfsdf', 'product_id':'fsdfsfd'}, {'ingredient':'abcsdf', 'product_id':'adslsfd'}], 
#     ['sdfdsfsdfs', 'sfdfsdfsdfsfds', 'fsdfsdfsdsfdsfs'])

################## database structure ##################
'''
recipe:
{
    'title': (string, strip, not empty)
    'intro': (string)
    'photo': (string)
    'sold': (int)
    'difficulty': (int)
    'rating': (int)
    'people_rated': (int)
    'owner_id': (string)
    'cooktime': (int)
    'preptime': (int)
    'serves': (int)
    'ingredients':
        [
            {
                'ingredient': (string),
                'product_id': (string),
                'quantity': (int),
            }
        ]
    'steps':
        [
            (string)
        ]
    'comments':
        [
            {
                user_id: (string),
                user_name: (string),
                rating: (int),
                comment: (string),
                time: (datetime)
            }
        ]
    'labels':
        [
            (string)
        ]
}
'''