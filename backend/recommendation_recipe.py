import database
from bson.objectid import ObjectId
import recommendation_helper

def recommendation_recipe(recipe_id):
    recipes = database.get_recipes()
    recipe = recipes.find_one({"_id":ObjectId(recipe_id)})
    labels = set(list(map(lambda x: x.lower(), recipe['labels'])))

    recipe_all = list(recipes.find())

    whole_counter, whole_rating = recommendation_helper.average_all_recipes(recipe_all)


    recipe_ids = []
    for recipe in recipe_all:
        recipe_labels = set(list(map(lambda x: x.lower(), recipe['labels'])))
        diff = labels - recipe_labels
        label_point = len(labels) - len(diff)
        label_point = recommendation_helper.assign_point(recipe, label_point, whole_counter, whole_rating)
        recipe_ids.append((label_point, str(recipe['_id'])))

    # Sort the recipe according to the point
    recipe_ids.sort(key=lambda x:x[0])
    recipe_ids.reverse()
    final_recipe = []

    # Don't recommend the recipe that is already bought
    for recipe in recipe_ids:
        (_, id) = recipe
        if recipe_id != id:
            final_recipe.append(id)

    return {
        "recipe_list":final_recipe
    }

################## testing ##################
# print(recommendation_recipe('619483ea2f00a1e0699600d9'))