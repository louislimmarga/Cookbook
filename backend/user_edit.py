import database
import token_helper
import argument_checker
import auth_helper
from error import InputError
def user_edit(token, first_name, last_name, photo, email, address, state, postcode, phone):
    ''' Edit the information of a user '''
    # Retrieve data from the database
    users = database.get_users()
    # check if the token is valid and find the user
    token_helper.is_token_valid(token, users)

    # check if the fields have arguments
    argument_checker.all_not_empty([first_name, last_name, email, phone])

    # check if the input contains white space
    argument_checker.no_white_space([first_name, last_name, email, phone])
    if state != "":
        argument_checker.no_white_space([state])
    if postcode != "":
        argument_checker.no_white_space([postcode])

    user = users.find_one({"token":token})

    if user['email'] != email:
        # check if the email is in valid and has not been used
        auth_helper.validate_email(email, users)

    if user['phone'] != phone:
        # check if the username has not been taken
        if auth_helper.check_phone_in_use(phone, users):
            raise InputError(description="Phone is already taken")



    # Update the user information
    users.update_one({"token":token}, {"$set": {"first_name":first_name}})
    users.update_one({"token":token}, {"$set": {"last_name":last_name}})
    users.update_one({"token":token}, {"$set": {"photo":photo}})
    users.update_one({"token":token}, {"$set": {"email":email}})
    users.update_one({"token":token}, {"$set": {"address":address}})
    users.update_one({"token":token}, {"$set": {"state":state}})
    users.update_one({"token":token}, {"$set": {"postcode":postcode}})
    users.update_one({"token":token}, {"$set": {"phone":phone}})

    # Return the user id
    return {
        "user_id":str(user['_id'])
    }