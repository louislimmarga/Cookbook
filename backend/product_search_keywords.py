import database
import re

def product_search_keyword(keyword):
    ''' list all the products with the given keyword '''
    # Retrieve the data from the database
    products = database.get_products()
    product_list = list(products.find())

    product_ids = []
    # Iterate through the product list
    for product in product_list:
        # Check if the title contains the keyword
        if re.search(keyword.lower(), product['title'].lower()):
            product_ids.append(str(product['_id']))

    # Return the ids that match the title
    return {
        "product_ids":product_ids
    }