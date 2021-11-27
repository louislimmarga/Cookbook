import argument_checker
import database
import auth_helper
import encryption_helper
import re
from error import InputError

def auth_register(first_name, last_name, photo, email, address, state, postcode, phone, username, password, confirmpassword):
    ''' Register a user '''
    users = database.get_users()

    # check if the fields have arguments
    argument_checker.all_not_empty([first_name, last_name, email, phone, username, password, confirmpassword])

    # check if the input contains white space
    argument_checker.no_white_space([first_name, last_name, email, phone, username, password, confirmpassword])
    if state != "":
        argument_checker.no_white_space([state])
    if postcode != "":
        argument_checker.no_white_space([postcode])

    # check if the email is in valid and has not been used
    auth_helper.validate_email(email, users)

    # check if the username has not been taken
    if auth_helper.check_user_name(username, users):
        raise InputError(description="Username is already taken")

    # check if the username has not been taken
    if auth_helper.check_phone_in_use(phone, users):
        raise InputError(description="Phone is already taken")

    # check password is long enough
    if len(password) < 8:
        raise InputError(description='Password too short')

    # check if the confirm password is correct
    if (confirmpassword != password):
        raise InputError(description="Confirm password is wrong")

    # hashes Password
    password_hash = encryption_helper.hash_password(password)

    # create token
    token = encryption_helper.generate_token()

    regex = '^\w+([\.-]?\w+)*@cookbook.com$'

    if re.search(regex, email):
        admin = True
    else:
        admin = False


    # create user data
    user = {"username":username, "password":password_hash, "first_name":first_name, 
    "last_name":last_name, "email":email, "address":address, "state":state, "postcode":postcode, 
    "phone":phone, "follower":0, "reward":0, "admin":admin, "token":token, "photo":photo, "recipe_bought":[], "following":[]}

    users.insert_one(user)

    user = users.find_one({"username":username})
    user_id = str(user['_id'])

    # return user_id and token
    return {
        'user_id': user_id,
        'token': token
    }

################## testing ##################
# auth_register("Trina", "Chang", "kabcde@cookbook.com", "", "", "", "09123", "TrinaChang", "abcdefgh", "abcdefgh")
# auth_register("Jenna", "Chan", "jennaclown@gmail.com", "", "", "", "09123456", "JennaChan", "iamsougly", "iamsougly")