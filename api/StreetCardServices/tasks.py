# https://docs.celeryproject.org/en/stable/django/first-steps-with-django.html
# celery -A api worker -l info


from celery import shared_task
from time import sleep
from api.celery import app
from celery.exceptions import SoftTimeLimitExceeded
from django.core.mail import send_mail
from django.conf import settings


# @param message String containing information on appointment.
# @param title Title of the email, gonna hardcode it to reminder.
# @param sender: Sender Email address
# @param recipient: List of addressses to get the email (in most cases should be just 1)
# As this is a demo we have currently set up using Gmail, but as the scope gets larger you might want to migrate to 
# a better service such as AmazonSES.
@shared_task
def send_email_task(message, title, sender, recipient):
    try:
        send_mail(subject=title, 
                message=message,
                from_email=sender, 
                recipient_list=recipient,
                fail_silently=False)
    except SoftTimeLimitExceeded:
        print(f"Soft Time Limit has Exceeed for sending email to {recipient} for appointment.")


@shared_task
def revoke_email_task(taskId):
    app.control.revoke(taskId, terminate=True)
    print("REVOKED TASK: ", taskId)