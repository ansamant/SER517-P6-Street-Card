from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User


# Create your models here.
class SocialWorker(models.Model):
    class ClearanceLevel(models.IntegerChoices):
        LEVEL0 = 0, _("Level 0")
        LEVEL1 = 1, _("Level 1")
        LEVEL2 = 2, _("Level 2")

    class ServiceProvider(models.TextChoices):
        FOOD_PANTRY = "FP", _("Food Pantry")
        DROP_IN_CENTRE = "DIC", _("Drop-in Centre")
        SHELTER_HOMES = "SH", _("Shelter Home")
        SOUP_KITCHEN = "SK", _("Soup Kitchen")

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    clearanceLevel = models.IntegerField(choices=ClearanceLevel.choices)
    address = models.CharField(max_length=500)
    serviceProvider = models.TextField(choices=ServiceProvider.choices)
