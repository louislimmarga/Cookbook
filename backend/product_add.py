import database
import token_helper
from error import AccessError
import argument_checker

def product_add(token, title, photo, description, price, labels):
    ''' Add a product '''
    # Retrieve the data from the database
    users = database.get_users()
    products = database.get_products()

    # Check if the token is valid and find the user
    token_helper.is_token_valid(token, users)
    user = users.find_one({"token":token})
    
    # Check if the user is an admin
    if not user['admin']:
        raise AccessError(description="The user does not have permission")

    # Check if all fields are not empty
    argument_checker.all_not_empty([title, photo, description])

    product = {
        "title": title, 
        "photo": photo,
        "description": description,
        "price": price,
        "labels": labels
    }

    # Add the product to the database
    result = products.insert_one(product)

    # Return the product id
    return {
        'product_id': str(result.inserted_id)
    }

################## testing ##################
# users = database.get_users()
# user = users.find_one({"username":"JennaChan"})
# product_add(user['token'], 'fdsdfsf', 'sfsdfsd', 'sdfsdf', ['sdfsdf', 'sdfsdf'])







    
