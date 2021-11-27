from error import InputError

def is_empty_string(string):
    '''
        Returns True if string is any combination of empty
        E.g. Contains only spaces, tabs, new lines or no character
    '''

    string = string.strip()

    if string and (not string.isspace()):
        return False

    return True

def all_not_empty(args):
    '''
        Given a list of string, passes if they're all not empty
        Else raises InputError if any are empty
    '''
    for string in args:
        if is_empty_string(string):
            raise InputError(description='An input field is empty')

def no_white_space(args):
    '''
        checks that argument doesn't contain any whitespace chars and not empty
    '''
    all_not_empty(args)

    for arg in args:
        if (' ' or "\t" or "\n" or "\v" or "\f" or "\r") in arg:
            raise InputError(description='Input contains space')