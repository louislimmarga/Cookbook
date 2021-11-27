from typing import ItemsView
import pandas as pd

def email_order_details(details):
    ''' Return order details (ingredients) in dataframe format and total '''
    ingredients = []
    total = 0
    # Obtain ingredients list and total from shopping cart
    for recipe in details:
        ingredients += recipe["recipe_ingredients"]
        total += recipe["recipe_subtotal"]
    n_ingredients = len(ingredients)

    # Convert list into dataframe
    product, quantity, subtotal = [], [], []
    for ingredient in ingredients:
        product.append(ingredient["title"])
        quantity.append(ingredient["quantity"])
        subtotal.append("${:.2f}".format(ingredient["subtotal"]))
    df_ingredients = pd.concat([pd.DataFrame(product), pd.DataFrame(quantity), pd.DataFrame(subtotal)], axis=1)
    df_ingredients.columns = ["Product", "Quantity", "Subtotal"]

    # return total, number of ingredient and the ingredients details
    return total, n_ingredients, df_ingredients

################## testing ##################
# details = [{'recipe_id': '61822a0c5ac1298dfea87153', 'recipe_ingredients': [{'id': '61822388cc5920235e3244e7', 'title': 'chicken breast', 'photo': 'dfdsfsdfsfsfsd', 'description': 'yummy chicken breast', 'price': 1.5, 'quantity': 100, 'subtotal': 150.0}, {'id': '618223e0cc5920235e3244ea', 'title': 'chicken fillet', 'photo': 'bnkmfgljdsf', 'description': 'yummy chicken fillet', 'price': 2, 'quantity': 200, 'subtotal': 400}], 'recipe_subtotal': 550.0}, {'recipe_id': '61833fa71f805c540f9562f4', 'recipe_ingredients': [{'id': '61822388cc5920235e3244e7', 'title': 'chicken breast', 'photo': 'dfdsfsdfsfsfsd', 'description': 'yummy chicken breast', 'price': 1.5, 'quantity': 1, 'subtotal': 1.5}, {'id': '618223f6cc5920235e3244ed', 'title': 'chicken leg', 'photo': 'njlkerwe', 'description': 'yummy chicken leg', 'price': 1, 'quantity': 3, 'subtotal': 3}], 'recipe_subtotal': 4.5}]
# total, n_items, df_ingredients = email_order_details(details)
# print(total)
# print(n_items)
