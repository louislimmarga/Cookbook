import database
import recipe_helper
import auth_helper
from error import AccessError
from bson.objectid import ObjectId

def recipe_view(recipe_id):
    ''' view a recipe '''
    # Retrieve the data from the database
    recipes = database.get_recipes()
    products = database.get_products()
    users = database.get_users()
    # check if the recipe exists
    if not recipe_helper.check_recipe_exist(ObjectId(recipe_id), recipes):
        raise AccessError(description="recipe does not exist")

    # Get the information associated with the recipe
    recipe = recipes.find_one({"_id":ObjectId(recipe_id)})

    title = recipe['title']
    intro = recipe['intro']
    photo = recipe['photo']
    sold = recipe['sold']
    difficulty = recipe['difficulty']
    cooktime = recipe['cooktime']
    preptime = recipe['preptime']
    serves = recipe['serves']
    ingredients = recipe['ingredients']
    # Iterate through the ingredient and return the name for each product
    for ingredient in ingredients:
        product = products.find_one({"_id":ObjectId(ingredient['product_id'])})
        ingredient['product_name'] = product['title']
    labels = recipe['labels']
    owner_id = recipe['owner_id']
    # Calculate the rating
    rating = 0
    counter = 0
    for comment in recipe['comment']:
        rating += int(comment['rating'])
        counter += 1
    if counter == 0:
        rating = 0
    else:
        rating = rating/counter
    steps = recipe['steps']

    owner_id = recipe['owner_id']

    # check if the user exists
    if not auth_helper.check_user_id(ObjectId(owner_id), users):
        raise AccessError(description="user does not exist")
    owner = users.find_one({"_id":ObjectId(owner_id)})
    
    # if the owner is admin no follower numbershows up
    if owner['admin']:
        owner_username = "admin"
        owner_follower = -1
        owner_photo = ""
    else:
        owner_username = owner['username']
        owner_follower = owner['follower']
        owner_photo = owner['photo']

    # return the recipe details
    return {
        'title': title,
        'intro': intro,
        'photo': photo,
        'sold': sold,
        'difficulty': difficulty,
        'rating': rating,
        'cooktime': cooktime,
        'preptime': preptime,
        'serves': serves,
        'owner_username': owner_username,
        'owner_follower': owner_follower,
        'owner_photo': owner_photo, 
        'ingredients': ingredients,
        'steps': steps,
        'labels': labels,
        'owner_id': owner_id
    }

################## testing ##################
# recipes = database.get_recipes()
# recipe = recipes.find_one({"title":"yummy chicken"})
# print(recipe_view(recipe['_id']))