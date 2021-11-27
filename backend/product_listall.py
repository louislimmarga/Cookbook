import database

def product_listall():
    ''' list all the products '''
    # Retrieve the data from the database
    products = database.get_products()
    product_list = list(products.find())

    # Iterate through the products
    product_ids = []
    for product in product_list:
        # Add the product id to the list
        product_ids.append(str(product['_id']))
    
    # Return the list of product id
    return {
        "product_list":product_ids
    }