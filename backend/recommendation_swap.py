import database
from bson.objectid import ObjectId

def recommendation_swap(product_id):
    ''' recommend swap ingredient '''
    # Retrieve the data from the database
    products = database.get_products()

    product = products.find_one({"_id":ObjectId(product_id)})
    
    # Get the label of the product
    labels = product['labels']
    labels = list(map(lambda x: x.lower(),labels))
    labels = set(labels)
    product_list = products.find()
    return_list = []

    # Iterate through the product list
    for single_product in product_list:
        single_labels = single_product['labels']
        single_labels = list(map(lambda x: x.lower(),single_labels))
        single_labels = set(single_labels)
        # Compare the label of the given product with the ones in the database
        if labels == single_labels and single_product['_id'] != product['_id']:
            return_list.append(str(single_product['_id']))

    # Return the product ids
    return {
        "product_id":return_list
    }