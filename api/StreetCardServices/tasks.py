# https://docs.celeryproject.org/en/stable/django/first-steps-with-django.html
# vP184DLE6D6zSL97q1YydUfFXUVqnFK3 
# celery -A api worker -l info
from celery import shared_task
from time import sleep

from django.core.mail import send_mail
from django.conf import settings

# Test Method
@shared_task
def sleeper(duration):
    print("IN SLEEPER")
    sleep(duration)
   
    
    
