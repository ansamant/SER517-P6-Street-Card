from django.db import models

from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import MaxLengthValidator, MinLengthValidator

# Create your models here.
class Client(models.Model):
    class NameDataQuality(models.IntegerChoices):
        FULL_NAME_REPORTED = 1, _('Full Name Reported')
        PARTIAL_NAME_REPORTED = 2, _('Partial Name Reported')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    class SSNDataQuality(models.IntegerChoices):
        FULL_SSN_REPORTED = 1, _('Full SSN Reported')
        PARTIAL_SSN_REPORTED = 2, _('Partial Name Reported')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    class DOBDataQuality(models.IntegerChoices):
        FULL_DOB_REPORTED = 1, _('Full DOB Reported')
        PARTIAL_DOB_REPORTED = 2, _('Partial DOB Reported')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    class Race(models.IntegerChoices):
        AMERICAN_INDIAN_OR_ALASKAN_NATIVE = 1, _('American India or Alaskan Native')
        ASIAN = 2, _('Asian')
        BLACK_OR_AFRICAN_AMERICAN = 3, _('Balck or African American')
        NATIVE_HAWAIIAN_OR_PACIFIC_ISLANDER = 4, _('Native Hawaiian or Pacific Islander')
        WHITE = 5, _('White')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    class Ethnicity(models.IntegerChoices):
        NON_HISPANIC_NON_LATINO = 0, _('Non Hispanic/Non Latino')
        HISPANIC_LATINO = 1, _('Hispanic/Latino')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    class Gender(models.IntegerChoices):
        FEMALE = 0, _('Female')
        MALE = 1, _('Male')
        TRANS_FEMALE = 3, _('Trans Female')
        TRANS_MALE = 4, _('Trans Male')
        GENDER_NON_CONFORMING = 5, _('Gender Non-Conforming')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    class VeteranStatus(models.IntegerChoices):
        NO = 0, _('No')
        YES = 1, _('Yes')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    PersonalId = models.CharField(max_length=32, blank=True, null=True)
    FirstName = models.CharField(max_length=128, blank=True, null=True)
    MiddleName = models.CharField(max_length=128, blank=True, null=True)
    LastName = models.CharField(max_length=128, blank=True, null=True)
    NameSuffix = models.CharField(max_length=128, blank=True, null=True)
    NameDataQuality = models.IntegerField(choices=NameDataQuality.choices)
    SSN = models.IntegerField(validators=[MaxLengthValidator(9), MinLengthValidator(4)], blank=True, null=True)
    SSNDataQuality = models.IntegerField(choices=SSNDataQuality.choices)
    DOB = models.DateField(blank=True, null=True)
    DOBDataQuality = models.IntegerField(choices=DOBDataQuality.choices)
    Race = models.IntegerField(choices=Race.choices)
    Ethnicity = models.IntegerField(choices=Ethnicity.choices)
    Gender = models.IntegerField(choices=Gender.choices)
    VeteranStatus = models.IntegerField(choices=VeteranStatus.choices)