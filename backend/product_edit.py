import database
import token_helper
from error import AccessError
import argument_checker
from bson.objectid import ObjectId

def product_edit(token, product_id, title, photo, description, price, labels):
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
    product_id = ObjectId(product_id)

    products.update_one({"_id":product_id}, {"$set": {"title":title}})
    products.update_one({"_id":product_id}, {"$set": {"photo":photo}})
    products.update_one({"_id":product_id}, {"$set": {"description":description}})
    products.update_one({"_id":product_id}, {"$set": {"price":price}})
    products.update_one({"_id":product_id}, {"$set": {"labels":labels}})

    return {
        'product_id': str(product_id)
    }