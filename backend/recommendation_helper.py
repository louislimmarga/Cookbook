def average_all_recipes(recipe_list):
    # Calculate the average rating
    whole_counter = 0
    whole_rating = 0
    for recipe in recipe_list:
        rating = 0
        counter = 0
        for comment in recipe['comment']:
            rating += int(comment['rating'])
            counter += 1
        if counter != 0:
            whole_rating += rating
            whole_counter += 1
    if whole_counter != 0:
        whole_rating = whole_rating / whole_counter
    return whole_counter, whole_rating

def assign_point(recipe, point,whole_counter, whole_rating):
    # Calculate the recipe rating
    rating = 0
    counter = 0
    for comment in recipe['comment']:
        rating += int(comment['rating'])
        counter += 1
    if whole_counter != 0:
        # Consider the rating when assigning point
        if counter != 0:
            rating = rating / counter
        else:
            rating = whole_rating
        return point * rating * 0.4
    else:
        return point