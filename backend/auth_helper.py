from error import InputError
import re

def check_user_name(username, users):
    ''' Returns True or False if username is already in use '''
    result = users.find_one({"username":username})
    if (result is None):
        return False
    return True

def check_phone_in_use(phone, users):
    ''' Returns True or False if phone is already in use '''
    result = users.find_one({"phone":phone})
    if (result is None):
        return False
    return True

def check_user_id(user_id, users):
    ''' Returns True or False if userid exists '''
    result = users.find_one({"_id":user_id})
    if (result is None):
        return False
    return True


def is_correct_email_format(email):
    '''
        Returns True or False if email in correct format

        Code taken from
        https://www.geeksforgeeks.org/check-if-email-address-valid-or-not-in-python/
    '''
    # Make a regular expression for validating an Email
    regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'

    if not re.search(regex, email):
        return False

    return True

def is_email_in_use(email, users):
    '''
        Returns True or False if email is already in use
        Else do nothing
    '''
    result = users.find_one({"email":email})
    if (result is None):
        return False
    return True

def validate_email(email, users):
    '''
        Raises error is invalid email or inuse
        Else does nothing
     '''
    if not is_correct_email_format(email):
        raise InputError(description="Wrong Email Format")

    if is_email_in_use(email, users):
        raise InputError(description="Email Already In Use")