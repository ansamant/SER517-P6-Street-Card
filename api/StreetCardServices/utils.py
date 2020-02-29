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
