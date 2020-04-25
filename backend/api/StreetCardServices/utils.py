"""
This is to check different type of users
@author:Shivam/Naren/Aditya/Prashnsa/Akash
"""
import random
import string


def check_and_assign(key, data):
    if key in data:
        return data.pop(key)
    else:
        return None


def primary_key_generator():
    """
    This method generates primary key
    """
    primary_key = ''.join(random.choices(string.ascii_letters + string.digits, k=32))
    return primary_key


def is_greeter(user):
    """
    This method is to check whether user is a greeter.
    """
    return user.groups.filter(name='greeter').exists()


def is_caseworker(user):
    """
    This method is to check whether user is a caseworker.
    """
    return user.groups.filter(name='caseworker').exists()


def is_client(user):
    """
    This method is to check whether user is a client.
    """
    return user.groups.filter(name='client').exists()


def is_service_provider(user):
    """
    This method is to check whether user is a service provider.
    """
    return user.groups.filter(name='service_provider').exists()
