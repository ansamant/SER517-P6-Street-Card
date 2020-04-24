import random
import string


def check_and_assign(key, data):
    if key in data:
        return data.pop(key)
    else:
        return None


def primary_key_generator():
    primary_key = ''.join(random.choices(string.ascii_letters + string.digits, k=32))
    return primary_key


def is_greeter(user):
    return user.groups.filter(name='greeter').exists()


def is_caseworker(user):
    return user.groups.filter(name='caseworker').exists()


def is_client(user):
    return user.groups.filter(name='client').exists()


def is_service_provider(user):
    return user.groups.filter(name='service_provider').exists()
