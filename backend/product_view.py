import database
from bson.objectid import ObjectId

def product_view(product_id):
    ''' reutnr the item of given product_id '''
    # Retrieve the data from the database
    products = database.get_products()

    product = products.find_one({"_id":ObjectId(product_id)})

    # Return the info associated with the product_id
    return {
        "title":product['title'],
        "photo":product['photo'],
        "description":product['description'],
        "price":product['price'],
        "labels":product['labels']
    }