from django.contrib.auth.models import User
from django.core.validators import MaxLengthValidator, MinLengthValidator
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from .utils import primary_key_generator


# Create your models here.

class ResponseCategory(models.IntegerChoices):
    NO = 0, _('No')
    YES = 1, _('Yes')
    CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
    CLIENT_REFUSED = 9, _('Client Refused')
    DATA_NOT_COLLECTED = 99, _('Data Not Collected')


class YesNoResponse(models.IntegerChoices):
    NO = 0, _('No')
    YES = 1, _('Yes')


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

    PersonalId = models.CharField(max_length=32, primary_key=True, default=primary_key_generator())
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


class ServiceProvider(models.TextChoices):
    FOOD_PANTRY = "FP", _("Food Pantry")
    DROP_IN_CENTRE = "DIC", _("Drop-in Centre")
    SHELTER_HOMES = "SH", _("Shelter Home")
    SOUP_KITCHEN = "SK", _("Soup Kitchen")
    NOT_AVAILABLE = "NA", _("Not Available")
    OTHERS = "OTH", _("Others")


class SocialWorker(models.Model):
    class ClearanceLevel(models.TextChoices):
        GREETER = "greeter", _("Greeter")
        CASEWORKER = "caseworker", _("CaseWorker")
        SERVICE_PROVIDER_EMPLOYEE = "service_provider_emp", _("Service Provider Employee")

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    clearanceLevel = models.TextField(choices=ClearanceLevel.choices)
    address = models.CharField(max_length=500)
    serviceProvider = models.TextField(choices=ServiceProvider.choices)


# Work in Progress
class ProjectCategory(models.TextChoices):
    HUD_COC_HOMELESS_PREVENTION = 'HUD:CoC-HomelessPrevention', _('HUD:CoC-HomelessPrevention')
    HUD_HOPWA_HOTEL_MOTEL_VOUCHERS = 'HUD:HOPWA – Hotel/Motel Vouchers', _('HUD:HOPWA – Hotel/Motel Vouchers')
    HUD_HOPWA_HOUSING_INFORMATION = 'HUD:HOPWA – Housing Information', _('HUD:HOPWA – Housing Information')
    HUD_HOPWA_PERMANENT_HOUSING = 'HUD:HOPWA – Permanent Housing (facility based or TBRA)', _(
        'HUD:HOPWA – Permanent Housing (facility based or TBRA)')
    HUD_HOPWA_PERMANENT_HOUSING_PLACEMENT = 'HUD:HOPWA – Permanent Housing Placement', _(
        'HUD:HOPWA – Permanent Housing Placement')
    HUD_HOPWA_SHORT_TERM_RENT_MORTGAGE_UTILITY_ASSISTANCE = 'HUD:HOPWA – Short-Term Rent, Mortgage, Utility assistance', _(
        'HUD:HOPWA – Short-Term Rent, Mortgage, Utility assistance')
    HUD_HOPWA_SHORT_TERM_SUPPORTIVE_FACILITY = 'HUD:HOPWA – Short-Term Supportive Facility', _(
        'HUD:HOPWA – Short-Term Supportive Facility')
    HUD_HOPWA_TransitionalHousing = 'HUD:HOPWA – Transitional Housing', _('HUD:HOPWA – Transitional Housing')


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


class NonCashBenefits(models.Model):
    InformationDate = models.DateField()
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE, related_name='NonCashBenefits_EnrollmentID',
                                     default=None)
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


# HOPWA Specific Project Elements

class W1ServicesProvidedHOPWA(models.Model):
    class HOPWAServiceType(models.IntegerChoices):
        ADULT_DAYCARE_AND_PERSONAL_ASSISTANCE = 1, _('Adult day care and personal assistance')
        CASE_MANAGEMENT = 2, _('Case management')
        CHILDCARE = 3, _('Child care')
        CRIMINAL_JUSTICE_LEGAL_SERVICES = 4, _('Criminal justice/legal services')
        EDUCATION = 5, _('Education')
        EMPLOYMENT_AND_TRAINING_SERVICES = 6, _('Employment and training services')
        FOOD_MEALS_NUTRITIONAL_SERVICES = 7, _('Food/meals/nutritional services')
        HEALTH_MEDICAL_CARE = 8, _('Health/medical care')
        LIFE_SKILLS_TRAINING = 9, _('Life skills training')
        MENTAL_HEALTH_CARE_COUNSELING = 10, _('Mental health care/counseling')
        OUTREACH_AND_OR_ENGAGEMENT = 11, _('Outreach and/or engagement')
        SUBSTANCE_ABUSE_SERVICES_TREATMENT = 12, _('Substance abuse services/treatment')
        TRANSPORTATION = 13, _('Transportation')
        OTHER_HOPWA_FUNDED_SERVICE = 14, _('Other HOPWA funded service')

    DateOfService = models.DateField()
    TypeOfService = models.IntegerField(choices=HOPWAServiceType.choices)
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='W1ServicesProvidedHOPWA_EnrollmentID',
                                     default=None)


class FinancialAssistanceHOPWA(models.Model):
    class FinancialAssistanceTypeCategory(models.IntegerChoices):
        RENTAL_ASSISTANCE = 1, _('Rental assistance')
        SECURITY_DEPOSITS = 2, _('Security deposits')
        UTILITY_DEPOSITS = 3, _('Utility deposits')
        UTILITY_PAYMENTS = 4, _('Utility payments')
        MORTGAGE_ASSISTANCE = 7, _('Mortgage assistance')

    DateOfFinancialAssistance = models.DateField()
    FinancialAssistanceType = models.IntegerField(choices=FinancialAssistanceTypeCategory.choices)
    FinancialAssistanceAmount = models.IntegerField(default=0)
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='FinancialAssistanceHOPWA_EnrollmentID',
                                     default=None)


class MedicalAssistanceHOPWA(models.Model):
    class IfNoReasonTypeCategory(models.IntegerChoices):
        APPLIED_DECISION_PENDING = 1, _('Applied; decision pending')
        APPLIED_CLIENT_NOT_ELIGIBLE = 2, _('Applied; client not eligible')
        CLIENT_DIDNOT_APPLY = 3, _('Client did not apply ')
        INSURANCE_TYPE_NA_FOR_THIS_CLIENT = 4, _('Insurance type N/A for this client')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    InformationDate = models.DateField()
    ReceivingPublicHIVAIDSMedicalAssistance = models.IntegerField(choices=ResponseCategory.choices)
    IfNoReason = models.IntegerField(choices=IfNoReasonTypeCategory.choices)
    ReceivingAIDSDrugAssistanceProgram = models.IntegerField(choices=ResponseCategory.choices)
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='MedicalAssistanceHOPWA_EnrollmentID',
                                     default=None)


class TCellCD4AndViralLoadHOPWA(models.Model):
    class InformationObtainedResponseCategory(models.IntegerChoices):
        MEDICAL_REPORT = 1, _('Medical Report')
        CLIENT_REPORT = 2, _('Client Report')
        OTHER = 3, _('Other')

    InformationDate = models.DateField()
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='TCellCD4AndViralLoadHOPWA_EnrollmentID',
                                     default=None)
    TCellCD4CountAvailable = models.IntegerField(choices=ResponseCategory.choices)
    IfYesTCellCount = models.IntegerField(validators=[MaxValueValidator(0), MinValueValidator(1500)])
    HowWasTheInformationObtained = models.IntegerField(choices=InformationObtainedResponseCategory.choices)
    ViralLoadInformationAvailable = models.IntegerField(choices=ResponseCategory.choices)
    ViralLoadCount = models.IntegerField(validators=[MaxValueValidator(0), MinValueValidator(999999)])


class HousingAssessmentAtExitHOPWA(models.Model):
    class HousingAssessmentAtExitResponseCategory(models.IntegerChoices):
        ABLE_TO_MAINTAIN_THE_HOUSING_THEY_HAD_AT_PROJECT_ENTRY = 1, _(
            "Able to maintain the housing they had at project entry")
        MOVED_TO_NEW_HOUSING_UNIT = 2, _('Moved to new housing unit')
        MOVED_IN_WITH_FAMILY_FRIENDS_ON_A_TEMPORARY_BASIS = 3, _('Moved in with family/friends on a temporary basis')
        MOVED_IN_WITH_FAMILY_FRIENDS_ON_A_PERMANENT_BASIS = 4, _('Moved in with family/friends on a permanent basis')
        MOVED_TO_A_TRANSITIONAL_OR_TEMPORARY_HOUSING_FACILITY_OR_PROGRAM = 5, _(
            " Moved to a transitional or temporary housing facility or program")
        CLIENT_BECAME_HOMELESS_MOVING_TO_A_SHELTER_OR_OTHER_PLACE_UNFIT_FOR_HUMAN_HABITATION = 6, _(
            "Client became homeless - moving to a shelter or other place unfit for human habitation")
        CLIENT_WENT_TO_JAIL_PRISON = 7, _('Client went to jail/prison')
        CLIENT_DIED = 10, _('Client Died')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    class SubsidyInformationResponseCategory(models.IntegerChoices):
        WITHOUT_A_SUBSIDY = 1, _('Without_a_subsidy')
        WITH_THE_SUBSIDY_THEY_HAD_AT_PROJECT_ENTRY = 2, _('With the subsidy they had at project entry')
        WITH_AN_ONGOING_SUBSIDY_ACQUIRED_SINCE_PROJECT_ENTRY = 3, _(
            'With an ongoing subsidy acquired since project entry')
        ONLY_WITH_FINANCIAL_ASSISTANCE_OTHER_THAN_A_SUBSIDY = 4, _(
            'Only with financial assistance other than a subsidy')

    class AnotherSubsidyInformationResponseCategory(models.IntegerChoices):
        WITH_ONGOING_SUBSIDY = 1, _('With ongoing subsidy')
        WITHOUT_AN_ONGOING_SUBSIDY = 2, _('Without an ongoing subsidy')

    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='HousingAssessmentAtExitHOPWA_EnrollmentID',
                                     default=None)
    HousingAssessmentAtExit = models.IntegerField(choices=HousingAssessmentAtExitResponseCategory.choices)
    SubsidyInformation = models.IntegerField(choices=SubsidyInformationResponseCategory.choices)
