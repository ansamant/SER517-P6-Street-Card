from django.contrib.auth.models import User
from django.core.validators import MaxLengthValidator, MinLengthValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from .utils import primary_key_generator


class ResponseCategory(models.IntegerChoices):
    NO = 0, _('No')
    YES = 1, _('Yes')
    CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
    CLIENT_REFUSED = 9, _('Client Refused')
    DATA_NOT_COLLECTED = 99, _('Data Not Collected')


class YesNoResponse(models.IntegerChoices):
    NO = 0, _('No')
    YES = 1, _('Yes')


# Create your models here.
class Homeless(models.Model):
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

    PersonalId = models.CharField(max_length=32, primary_key=True, unique=True)
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


class SocialWorker(models.Model):
    class ClearanceLevel(models.TextChoices):
        GREETER = "greeter", _("Greeter")
        CASEWORKER = "caseworker", _("CaseWorker")
        SERVICE_PROVIDER_EMPLOYEE = "service_provider_emp", _("Service Provider Employee")

    class ServiceProvider(models.TextChoices):
        FOOD_PANTRY = "FP", _("Food Pantry")
        DROP_IN_CENTRE = "DIC", _("Drop-in Centre")
        SHELTER_HOMES = "SH", _("Shelter Home")
        SOUP_KITCHEN = "SK", _("Soup Kitchen")
        NOT_AVAILABLE = "NA", _("Not Available")
        OTHERS = "OTH", _("Others")

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    clearanceLevel = models.TextField(choices=ClearanceLevel.choices)
    address = models.CharField(max_length=500)
    serviceProvider = models.TextField(choices=ServiceProvider.choices)


# Work in Progress
class ProjectCategory(models.TextChoices):
    HUD_COC_HOMELESS_PREVENTION = 'HUD:CoC-HomelessPrevention', _('HUD:CoC-HomelessPrevention')


class SubstanceAbuseCategory(models.IntegerChoices):
    NO = 0, _('No')
    ALCOHOL = 1, _('Alcohol')
    DRUG = 2, _('Drug')
    BOTH = 3, _('Both Drug and Alcohol')
    CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
    CLIENT_REFUSED = 9, _('Client Refused')
    DATA_NOT_COLLECTED = 99, _('Data Not Collected')


class DomesticViolenceOccurrence(models.IntegerChoices):
    PAST_THREE_MONTHS = 1, _('Past 3 Months')
    THREE_TO_SIX_MONTHS = 2, _('Three to six months ago')
    SIX_MONTHS_TO_ONE_YEAR = 3, _('Six Months to One year')
    ONE_YEAR_OR_MORE = 4, _('One year or more')
    CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
    CLIENT_REFUSED = 9, _('Client Refused')
    DATA_NOT_COLLECTED = 99, _('Data Not Collected')


class Enrollment(models.Model):
    DisablingCondition = models.IntegerField(choices=YesNoResponse.choices, default=YesNoResponse.NO)
    EnrollmentID = models.CharField(max_length=32, primary_key=True, default=primary_key_generator())
    PersonalId = models.ForeignKey(Homeless, on_delete=models.CASCADE, default=None,
                                   related_name='Enrollment_PersonalId')
    ProjectCategory = models.TextField(choices=ProjectCategory.choices, default=None, null=True)
    EntryDate = models.DateField(null=True)
    ExitDate = models.DateField(null=True)


class DomesticViolence(models.Model):
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='DomesticViolence_EnrollmentID')
    InformationDate = models.DateField()
    DomesticViolenceVictim = models.IntegerField(choices=YesNoResponse.choices)
    WhenOccurred = models.IntegerField(choices=DomesticViolenceOccurrence.choices)
    CurrentlyFleeing = models.IntegerField(choices=ResponseCategory.choices)


class DisablingCondition(models.Model):
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='DisablingCondition_EnrollmentID')
    InformationDate = models.DateField()
    physical_disability = models.IntegerField(choices=ResponseCategory.choices, null=True, default=None)
    physical_disability_impairing = models.IntegerField(choices=ResponseCategory.choices, blank=True, null=True,
                                                        default=None)
    developmental_disability = models.IntegerField(choices=ResponseCategory.choices, null=True, default=None)
    developmental_disability_impairing = models.IntegerField(choices=ResponseCategory.choices, blank=True, null=True,
                                                             default=None)
    chronic_health = models.IntegerField(choices=ResponseCategory.choices, null=True, default=None)
    chronic_health_impairing = models.IntegerField(choices=ResponseCategory.choices, blank=True, null=True,
                                                   default=None)
    hiv_aids = models.IntegerField(choices=ResponseCategory.choices, null=True, default=None)
    hiv_aids_impairing = models.IntegerField(choices=ResponseCategory.choices, blank=True, null=True, default=None)
    mental_health = models.IntegerField(choices=ResponseCategory.choices, null=True, default=None)
    mental_health_impairing = models.IntegerField(choices=ResponseCategory.choices, blank=True, null=True, default=None)
    substance_abuse = models.IntegerField(choices=SubstanceAbuseCategory.choices, null=True, default=None)
    substance_abuse_impairing = models.IntegerField(choices=ResponseCategory.choices, blank=True, null=True,
                                                    default=None)

    # Work in Progress


class IncomeAndSources(models.Model):
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE, related_name='IncomeAndSources_EnrollmentID',
                                     default=None)
    InformationDate = models.DateField()
    IncomeFromAnySources = models.IntegerField(choices=ResponseCategory.choices)
    Earned = models.IntegerField(choices=YesNoResponse.choices, default=0)
    EarnedIncome = models.IntegerField(default=0)
    Unemployment = models.IntegerField(choices=YesNoResponse.choices, default=0)
    UnemploymentAmount = models.IntegerField(null=True)
    SSI = models.IntegerField(choices=YesNoResponse.choices)
    SSIAmount = models.IntegerField(null=True)
    SSDI = models.IntegerField(choices=YesNoResponse.choices)
    SSDIAmount = models.IntegerField(null=True)
    VADisabilityService = models.IntegerField(choices=YesNoResponse.choices)
    VADisabilityServiceAmount = models.IntegerField(null=True)
    VADisabilityNonService = models.IntegerField(choices=YesNoResponse.choices)
    VADisabilityNonServiceNonAmount = models.IntegerField(null=True)
    PrivateDisability = models.IntegerField(choices=YesNoResponse.choices)
    PrivateDisabilityAmount = models.IntegerField(null=True)
    WorkersComp = models.IntegerField(choices=YesNoResponse.choices)
    WorkersCompAmount = models.IntegerField(null=True)
    TANF = models.IntegerField(choices=YesNoResponse.choices)
    TANFAmount = models.IntegerField(null=True)
    GA = models.IntegerField(choices=YesNoResponse.choices)
    GAAmount = models.IntegerField(null=True)
    SocSecRetirement = models.IntegerField(choices=YesNoResponse.choices)
    SocSecRetirementAmount = models.IntegerField(null=True)
    Pension = models.IntegerField(choices=YesNoResponse.choices)
    PensionAmount = models.IntegerField(null=True)
    ChildSupport = models.IntegerField(choices=YesNoResponse.choices)
    ChildSupportAmount = models.IntegerField(null=True)
    Alimony = models.IntegerField(choices=YesNoResponse.choices)
    AlimonyAmount = models.IntegerField(null=True)
    OtherIncomeSources = models.IntegerField(choices=YesNoResponse.choices)
    OtherIncomeSourcesAmount = models.IntegerField(null=True)
    OtherIncomeSourcesIdentify = models.TextField(max_length=50, blank=True, null=True)
    TotalMonthlyIncome = models.IntegerField(default=0)


class NonCashBenefits(models.Model):
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE, related_name='NonCashBenefits_EnrollmentID',
                                     default=None)
    InformationDate = models.DateField()
    BenefitsFromAnySource = models.IntegerField(choices=ResponseCategory.choices)
    SNAP = models.IntegerField(choices=YesNoResponse.choices)
    WIC = models.IntegerField(choices=YesNoResponse.choices)
    TANFChildCare = models.IntegerField(choices=YesNoResponse.choices)
    TANFTransportation = models.IntegerField(choices=YesNoResponse.choices)
    OtherTANF = models.IntegerField(choices=YesNoResponse.choices)
    OtherSource = models.IntegerField(choices=YesNoResponse.choices)
    SpecifySource = models.CharField(max_length=50)
    RentalAssistanceOngoing = models.IntegerField(null=True)
    RentalAssistanceTemp = models.IntegerField(null=True)
    DataCollectionStage = models.IntegerField(null=True)


class HealthInsurance(models.Model):
    class InsuranceReasonCategory(models.IntegerChoices):
        APPLIED_DECISION_PENDING = 1, _('Applied;decision pending')
        APPLIED_CLIENT_NOT_ELIGIBLE = 2, _('Applied;client not eligible')
        CLIENT_DIDNOT_APPLY = 3, _('Client did not apply')
        INSURANCE_TYPE_NA_FOR_THIS_CLIENT = 4, _('Insurance type N/A for this client')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE, related_name='HealthInsurance_EnrollmentID',
                                     default=None)
    InformationDate = models.DateField()
    CoveredByHealthInsurance = models.IntegerField(choices=ResponseCategory.choices)
    Medicaid = models.IntegerField(choices=YesNoResponse.choices)
    Medicare = models.IntegerField(choices=YesNoResponse.choices)
    SCHIP = models.IntegerField(choices=YesNoResponse.choices)
    VAMedicalServices = models.IntegerField(choices=YesNoResponse.choices)
    EmployerProvided = models.IntegerField(choices=YesNoResponse.choices)
    COBRA = models.IntegerField(choices=YesNoResponse.choices)
    PrivatePay = models.IntegerField(choices=YesNoResponse.choices)
    StateHealthInsuranceForAdults = models.IntegerField(choices=YesNoResponse.choices)
    IndianHealthServices = models.IntegerField(choices=YesNoResponse.choices)
    OtherInsurance = models.IntegerField(choices=YesNoResponse.choices)
    SpecifySource = models.CharField(max_length=50)
    Reason = models.TextField(choices=InsuranceReasonCategory.choices)
