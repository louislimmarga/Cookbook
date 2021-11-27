import database
import recommendation_helper
from bson.objectid import ObjectId

def recommendation_questions(q1, q2, q3, q4, q5, q6):
    ''' recoommend recipes based on the answers of the questions '''
    answer_list = q1 + q2 + q3 + q4 + q5 + q6
    new_list = []
    for ele in answer_list:
        if not ele == '':
            new_list.append(ele)
    new_list = list(map(lambda x: x.lower(), new_list))
    match = set(new_list)
    recipes = database.get_recipes()
    recipe_list = list(recipes.find())
    whole_counter, whole_rating = recommendation_helper.average_all_recipes(recipe_list)

    recipe_ids = []
    for recipe in recipe_list:
        recipe_labels = set(list(map(lambda x: x.lower(), recipe['labels'])))
        diff = match - recipe_labels
        label_point = abs(len(match) - len(diff))
        label_point = recommendation_helper.assign_point(recipe, label_point, whole_counter, whole_rating)
        recipe_ids.append((label_point, str(recipe['_id'])))

    # Sort the recipe according to the point
    recipe_ids.sort(key=lambda x:x[0])
    recipe_ids.reverse()
    final_reicpe = []
    max = 0
    min = 0
    if len(recipe_ids) > 0:
        (point, id) = recipe_ids[0]
        max = point
        (point, id) = recipe_ids[len(recipe_ids) - 1]
        min = point
    else:
        return {
            "recipe_list":final_reicpe
        }
    standard = (max + min) * 0.5
    # Don't recommend the recipe that is already bought
    for recipe in recipe_ids:
        (point, id) = recipe
        temp = recipes.find_one({"_id":ObjectId(id)})
        if point >= standard:
            final_reicpe.append((id, temp['labels'], point))

    return {
        "recipe_list":final_reicpe
    }

################## testing ##################
# print(recommendation_questions([],["chicken"],[],[],[],[]))