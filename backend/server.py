from flask import Flask, request
from flask_cors import CORS
from json import dumps

from auth_register import auth_register
from auth_login import auth_login
from auth_logout import auth_logout

from recipe_view import recipe_view
from recipe_upload import recipe_upload
from recipe_listall import recipe_listall
from recipe_comment import recipe_comment
from recipe_comment_view import recipe_comment_view
from recipe_search_keyword import recipe_search_keyword
from recipe_search_label import recipe_search_label
from recipe_edit import recipe_edit
from recipe_delete import recipe_delete

from product_add import product_add
from product_view import product_view
from product_search_keywords import product_search_keyword
from product_listall import product_listall
from product_edit import product_edit

from cart_add import cart_add
from cart_remove import cart_remove
from cart_reward import cart_reward
from cart_retrieve import cart_retrieve
from cart_clean import cart_clean
from cart_update import cart_update

from order_update import order_update
from order_listall import order_listall
from order_view import order_view
from order_add import order_add
from order_details import order_details

from recommendation_questions import recommendation_questions
from recommendation_history import recommendation_history
from recommendation_swap import recommendation_swap
from recommendation_user_following import recommendation_user_following
from recommendation_recipe import recommendation_recipe

from sales_total import sales_total
from sales_product import sales_product
from sales_timeframe import sales_timeframe

from admin_check import admin_check

from profile_view import profile_view
from profile_most_popular import profile_most_popular

from id_check import id_check

from user_follow import user_follow
from user_listfollow import user_listfollow
from user_unfollow import user_unfollow
from user_edit import user_edit
from user_photo import user_photo

from reward_balance import reward_balance

def default_handler(err):
    ''' Default Handle '''
    response = err.get_response()
    print('response', err, err.get_response())
    response.data = dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response

APP = Flask(__name__)
CORS(APP)

APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, default_handler)

##### AUTH ROUTE #####

@APP.route("/auth/register", methods=['POST'])
def auth_register_root():
    ''' Register User '''
    payload = request.get_json()
    first_name = payload['first_name']
    last_name = payload['last_name']
    photo = payload['photo']
    email = payload['email']
    address = payload['address']
    state = payload['state']
    postcode = payload['postcode']
    phone = payload['phone']
    username = payload['username']
    password = payload['password']
    confirmpassword = payload['confirmpassword']
    return dumps(
        auth_register(first_name, last_name, photo, email, address, state, postcode, phone, username, password, confirmpassword)
    )

@APP.route("/auth/login", methods=['POST'])
def auth_login_root():
    ''' Login a user '''
    payload = request.get_json()
    return dumps(auth_login(payload['username'], payload['password']))


@APP.route("/auth/logout", methods=['POST'])
def auth_logout_root():
    ''' Logs out a user '''
    payload = request.get_json()
    return dumps(auth_logout(payload['token']))

##### RECIPE ROUTE #####

@APP.route("/recipe/view", methods=['GET'])
def recipe_view_root():
    ''' Return recipe information '''
    recipe_id = request.args.get('recipe_id')
    return dumps(
        recipe_view(recipe_id)
    )

@APP.route("/recipe/upload", methods=['POST'])
def recipe_upload_root():
    ''' Upload a recipe '''
    payload = request.get_json()
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    # token = payload['token']
    title = payload['title']
    intro = payload['intro']
    photo = payload['photo']
    difficulty = payload['difficulty']
    cooktime= payload['cooktime']
    preptime = payload['preptime']
    serves = payload['serves']
    steps = payload['steps']
    ingredients = payload['ingredients']
    labels = payload['labels']
    return dumps(
        recipe_upload(token, title, intro, photo, difficulty, cooktime, preptime, serves, ingredients, steps, labels)
    )

@APP.route("/recipe/comment", methods=['POST'])
def recipe_comment_root():
    ''' Comment on a recipe '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    payload = request.get_json()
    comment = payload['comment']
    rating = payload['rating']
    recipe_id = payload['recipe_id']
    return dumps(
        recipe_comment(token, comment, rating, recipe_id)
    )

@APP.route("/recipe/comment_view", methods=['GET'])
def recipe_comment_view_root():
    ''' View the commens on a recipe '''
    recipe_id = request.args.get('recipe_id')
    return dumps(
        recipe_comment_view(recipe_id)
    )

@APP.route("/recipe/listall", methods=['GET'])
def recipe_list_all_root():
    ''' Return recipe information '''
    return dumps(recipe_listall())

@APP.route("/recipe/search_keyword", methods=['GET'])
def recipe_search_keyword_root():
    ''' List the recipes that have the keyword '''
    keyword = request.args.get('keyword')
    return dumps(
        recipe_search_keyword(keyword)
    )

@APP.route("/recipe/search_label", methods=['GET'])
def recipe_search_label_root():
    ''' List the recipes that have the label '''
    label = request.args.get('label')
    return dumps(
        recipe_search_label(label)
    )

@APP.route("/recipe/edit", methods=['POST'])
def recipe_edit_root():
    ''' Edit a recipe '''
    payload = request.get_json()
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    recipe_id = payload['recipe_id']    
    title = payload['title']
    intro = payload['intro']
    photo = payload['photo']
    difficulty = payload['difficulty']
    cooktime= payload['cooktime']
    preptime = payload['preptime']
    serves = payload['serves']
    steps = payload['steps']
    ingredients = payload['ingredients']
    labels = payload['labels']
    return dumps(
        recipe_edit(token, recipe_id, title, intro, photo, difficulty, cooktime, preptime, serves, ingredients, steps, labels)
    )

@APP.route("/recipe/delete", methods=['POST'])
def recipe_delete_root():
    ''' Delete a recipe '''
    payload = request.get_json()
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    recipe_id = payload['recipe_id']    
    return dumps(
        recipe_delete(token, recipe_id)
    )

##### PRODUCT ROUTE #####

@APP.route("/product/add", methods=['POST'])
def product_add_root():
    ''' Add a product '''
    payload = request.get_json()
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    # token = payload['token']
    title = payload['title']
    photo = payload['photo']
    description = payload['description']
    price = payload['price']
    labels = payload['labels']
    return dumps(
        product_add(token, title, photo, description, price, labels)
    )

@APP.route("/product/view", methods=['GET'])
def product_view_root():
    ''' Return order information '''
    product_id = request.args.get('product_id')
    return dumps(
        product_view(product_id)
    )

@APP.route("/product/search_keyword", methods=['GET'])
def product_search_keyword_root():
    ''' List the products that have the keyword '''
    keyword = request.args.get('keyword')
    return dumps(
        product_search_keyword(keyword)
    )

@APP.route("/product/listall", methods=['GET'])
def product_listall_root():
    ''' List all the products '''
    return dumps(
        product_listall()
    )

@APP.route("/product/edit", methods=['POST'])
def product_edit_root():
    ''' Edit the products '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    payload = request.get_json()
    product_id = payload['product_id']
    title = payload['title']
    photo = payload['photo']
    description = payload['description']
    price = payload['price']
    labels = payload['labels']
    return dumps(
        product_edit(token, product_id, title, photo, description, price, labels)
    )

##### CART ROUTE #####

@APP.route("/cart/add", methods=['POST'])
def cart_add_root():
    ''' Add product to shopping cart '''
    payload = request.get_json()
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    ingredients = payload['ingredients']
    recipe_id = payload['recipe_id']
    return dumps(
        cart_add(token, recipe_id, ingredients)
    )

@APP.route("/cart/remove", methods=['POST'])
def cart_remove_root():
    ''' Remove product from shopping cart '''
    payload = request.get_json()
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    # should be a single string with one ingredient id
    ingredient = payload['ingredient']
    recipe_id = payload['recipe_id']
    return dumps(
        cart_remove(token, recipe_id, ingredient)
    )

@APP.route("/cart/paypal", methods=['POST'])
def cart_paypal_root():
    ''' Add an order to the database '''
    payload = request.get_json()
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    firstname = payload['firstname']
    lastname= payload['lastname']
    email = payload['email']
    phone = payload['phone']
    address = payload['address']
    state = payload['state']
    postcode = payload['postcode']
    details = payload['details']
    total = payload['total']
    return dumps(
        order_add(token, firstname, lastname, email, phone, address, state, postcode, details, total)
    )

@APP.route("/cart/retrieve", methods=['GET'])
def cart_retrieve_root():
    ''' Retrieve products and total from shopping cart'''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    return dumps(
        cart_retrieve(token)
    )

@APP.route("/cart/reward", methods=['POST'])
def cart_reward_root():
    ''' Place order after checking reward points '''
    payload = request.get_json()
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    firstname = payload['firstname']
    lastname = payload['lastname']
    email = payload['email']
    phone = payload['phone']
    address = payload['address']
    state = payload['state']
    postcode = payload['postcode']
    return dumps(
        cart_reward(token, firstname, lastname, email, phone, address, state, postcode)
    )

@APP.route("/cart/clean", methods=['POST'])
def cart_clean_root():
    ''' Clean the shopping cart '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    return dumps(
        cart_clean(token)
    )

@APP.route("/cart/update", methods=['POST'])
def cart_update_root():
    ''' Update shopping cart '''
    payload = request.get_json()
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    ingredients = payload['ingredients']
    recipe_id = payload['recipe_id']
    return dumps(
        cart_update(token, recipe_id, ingredients)
    )

##### ORDER ROUTE #####

@APP.route("/order/view", methods=['GET'])
def order_view_root():
    ''' Return order information '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    order_id = request.args.get('order_id')
    return dumps(
        order_view(token, order_id)
    )

@APP.route("/order/listall", methods=['GET'])
def order_listall_root():
    ''' Return order list '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    status = request.args.get('status')
    return dumps(
        order_listall(token, status)
    )

@APP.route("/order/details", methods=['GET'])
def order_details_root():
    ''' Return order details '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    order_id = request.args.get('order_id')
    return dumps(
        order_details(token, order_id)
    )

@APP.route("/order/update", methods=['POST'])
def order_update_root():
    ''' Update order status '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    payload = request.get_json()
    order_id = payload['order_id']
    status = payload['status']
    return dumps(
        order_update(token, order_id, status)
    )

##### Recommendation ROUTE #####

@APP.route("/recommendation/questions", methods=['GET'])
def recommendation_questions_root():
    ''' Recommend reqcipes according the answers to the survey '''
    q1 = request.args.getlist('q1')
    q2 = request.args.getlist('q2')
    q3 = request.args.getlist('q3')
    q4 = request.args.getlist('q4')
    q5 = request.args.getlist('q5')
    q6 = request.args.getlist('q6')
    return dumps(
        recommendation_questions(q1, q2, q3, q4, q5, q6)
    )

@APP.route("/recommendation/history", methods=['GET'])
def recommendation_history_root():
    ''' Recommend reqcipes according the account history '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    return dumps(
        recommendation_history(token)
    )

@APP.route("/recommendation/swap", methods=['GET'])
def recommendation_swap_root():
    ''' Recommend reqcipes for swapping '''
    product_id = request.args.get('product_id')
    print(type(product_id), product_id)
    return dumps(
        recommendation_swap(product_id)
    )

@APP.route("/recommendation/user_following", methods=['GET'])
def recommendation_user_following_root():
    ''' Recommend reqcipes of the following user '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    return dumps(
        recommendation_user_following(token)
    )

@APP.route("/recommendation/recipe", methods=['GET'])
def recommendation_recipe_root():
    ''' Recommend reqcipes of a recipe '''
    recipe_id = request.args.get('recipe_id')
    return dumps(
        recommendation_recipe(recipe_id)
    )

##### Admin ROUTE #####

@APP.route("/admin/check", methods=['GET'])
def admin_check_root():
    ''' Check if the user is an admin '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    return dumps(
        admin_check(token)
    )

##### id ROUTE #####

@APP.route("/id/check", methods=['GET'])
def id_check_root():
    ''' Check the id for the given token '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    return dumps(
        id_check(token)
    )

##### profile ROUTE #####

@APP.route("/profile/view", methods=['GET'])
def profile_view_root():
    ''' View the profile of an user '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    user_id = request.args.get('user_id')
    return dumps(
        profile_view(token, user_id)
    )

@APP.route("/profile/most_popular", methods=['GET'])
def profile_most_popular_root():
    ''' Show the most popular recipe of an user '''
    user_id = request.args.get('user_id')
    return dumps(
        profile_most_popular(user_id)
    )

##### User Route #####

@APP.route("/user/follow", methods=['POST'])
def user_follow_root():
    ''' Follow a user '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    payload = request.get_json()
    user_id = payload['user_id']
    return dumps(
        user_follow(token, user_id)
    )

@APP.route("/user/listfollow", methods=['GET'])
def user_listfollow_root():
    ''' List all the user the user is following '''
    user_id = request.args.get('user_id')
    return dumps(
        user_listfollow(user_id)
    )

@APP.route("/user/unfollow", methods=['POST'])
def user_unfollow_root():
    ''' Unfollow a user '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    payload = request.get_json()
    user_id = payload['user_id']
    return dumps(
        user_unfollow(token, user_id)
    )

@APP.route("/user/edit", methods=['POST'])
def user_edit_root():
    ''' Edit information of an user '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    payload = request.get_json()
    first_name = payload['first_name']
    last_name = payload['last_name']
    photo = payload['photo']
    email = payload['email']
    address = payload['address']
    state = payload['state']
    postcode = payload['postcode']
    phone = payload['phone']
    return dumps(
        user_edit(token, first_name, last_name, photo, email, address, state, postcode, phone)
    )

@APP.route("/user/photo", methods=['GET'])
def user_photo_root():
    ''' Return the photo of an user '''
    user_id = request.args.get('user_id')
    return dumps(
        user_photo(user_id)
    )

##### Sales Route #####

@APP.route("/sales/total", methods=['POST'])
def sales_total_root():
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    return dumps(
        sales_total(token)
    )

@APP.route("/sales/timeframe", methods=['POST'])
def sales_timeframe_root():
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    payload = request.get_json()
    initial_date= payload['initial_date']
    end_date = payload['end_date']
    return dumps(
        sales_timeframe(token, initial_date, end_date)
    )

@APP.route("/sales/product", methods=['POST'])
def sales_product_root():
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    payload = request.get_json()
    product_id = payload['product_id']
    return dumps(
        sales_product(token, product_id)
    )

@APP.route("/reward/balance", methods=['GET'])
def reward_balance_root():
    ''' reward balance of an user '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    return dumps(
        reward_balance(token)
    )

if __name__ == "__main__":
    APP.run()
