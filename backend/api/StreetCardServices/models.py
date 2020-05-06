"""
This is for object information generating database table
@author:Shivam/Naren/Aditya/Prashana/Akash 
"""
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class ResponseCategory(models.IntegerChoices):
    """
    This class is for different response type of client information
    """
    NO = 0, _('No')
    YES = 1, _('Yes')
    CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
    CLIENT_REFUSED = 9, _('Client Refused')
    DATA_NOT_COLLECTED = 99, _('Data Not Collected')


class YesNoResponse(models.IntegerChoices):
    """
    This class is for positive or negetive response type
    """
    NO = 0, _('No')
    YES = 1, _('Yes')


class Homeless(models.Model):
    """
    This class is for homeless person information
    """
    class NameDataQuality(models.IntegerChoices):
        """
        This class is for data gathered quality for homeless person name
        """
        FULL_NAME_REPORTED = 1, _('Full Name Reported')
        PARTIAL_NAME_REPORTED = 2, _('Partial Name Reported')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    class SSNDataQuality(models.IntegerChoices):
        """
        This class is for data gathered quality for homeless person SSN
        """
        FULL_SSN_REPORTED = 1, _('Full SSN Reported')
        PARTIAL_SSN_REPORTED = 2, _('Partial SSN Reported')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    class DOBDataQuality(models.IntegerChoices):
        """
        This class is for data gathered quality for date of birth of homeless person
        """
        FULL_DOB_REPORTED = 1, _('Full DOB Reported')
        PARTIAL_DOB_REPORTED = 2, _('Partial DOB Reported')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    class Race(models.IntegerChoices):
        """
        This class is for homeless person race information
        """
        AMERICAN_INDIAN_OR_ALASKAN_NATIVE = 1, _('American Indian or Alaskan Native')
        ASIAN = 2, _('Asian')
        BLACK_OR_AFRICAN_AMERICAN = 3, _('Black or African American')
        NATIVE_HAWAIIAN_OR_PACIFIC_ISLANDER = 4, _('Native Hawaiian or Pacific Islander')
        WHITE = 5, _('White')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    class Ethnicity(models.IntegerChoices):
        """
        This class is for homeless person ethnicity information 
        """
        NON_HISPANIC_NON_LATINO = 0, _('Non Hispanic/Non Latino')
        HISPANIC_LATINO = 1, _('Hispanic/Latino')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    class Gender(models.IntegerChoices):
        """
        This class is for homeless person gender information
        """
        FEMALE = 0, _('Female')
        MALE = 1, _('Male')
        TRANS_FEMALE = 3, _('Trans Female')
        TRANS_MALE = 4, _('Trans Male')
        GENDER_NON_CONFORMING = 5, _('Gender Non-Conforming')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    class VeteranStatus(models.IntegerChoices):
        """
        This class is for homeless person veteran status information
        """
        NO = 0, _('No')
        YES = 1, _('Yes')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    PersonalId = models.CharField(max_length=32, primary_key=True, default=None)
    FirstName = models.CharField(max_length=128, blank=True, null=True)
    MiddleName = models.CharField(max_length=128, blank=True, null=True)
    LastName = models.CharField(max_length=128, blank=True, null=True)
    NameSuffix = models.CharField(max_length=128, blank=True, null=True)
    NameDataQuality = models.IntegerField(choices=NameDataQuality.choices)
    # TODO
    # Update with proper regex to validate SSN
    # Convert to CharField because this would also contain '-' (hyphens)
    SSN = models.CharField(max_length=11, blank=True, null=True)
    SSNDataQuality = models.IntegerField(choices=SSNDataQuality.choices)
    DOB = models.DateField(blank=True, null=True)
    DOBDataQuality = models.IntegerField(choices=DOBDataQuality.choices)
    Race = models.IntegerField(choices=Race.choices)
    Ethnicity = models.IntegerField(choices=Ethnicity.choices)
    Gender = models.IntegerField(choices=Gender.choices)
    VeteranStatus = models.IntegerField(choices=VeteranStatus.choices)
    PhoneNumberPrefix = models.CharField(max_length=3, blank=True, null=True)
    PhoneNumber = models.CharField(max_length=128, blank=True, null=True)
    Email = models.EmailField(max_length=70, blank=True, null=True)

    def __str__(self):
        return self.FirstName

class ServiceProvider(models.TextChoices):
    """
    This class is for service provider information
    """
    FOOD_PANTRY = "FP", _("Food Pantry")
    DROP_IN_CENTRE = "DIC", _("Drop-in Centre")
    SHELTER_HOMES = "SH", _("Shelter Home")
    SOUP_KITCHEN = "SK", _("Soup Kitchen")
    NOT_AVAILABLE = "NA", _("Not Available")
    OTHERS = "OTH", _("Others")


# Inventory Tables:

class Product(models.Model):
    """
    This class is for available product information
    """
    class Category(models.TextChoices):
        """
        This class is for available product category information
        """
        Shoes = "Shoes", _("Shoes")
        Clothing = "Clothing", _("Clothing")
        MealPass = "MealPass", _("Meal Pass")
        TransportPass = "TransportPass", _("Transport Pass")
        PetFoods = "PetFood", _("Pet Food")
        PersonalHygieneItems = "PersonalHygieneItems", _("Personal Hygiene Items")
        RainGear = "RainGear", _("Rain Gear")

    productName = models.CharField(max_length=100)
    productId = models.CharField(primary_key=True, default=None, max_length=32, blank=True)
    costPerItem = models.FloatField()
    unitsAvailable = models.IntegerField()
    serviceProvider = models.TextField(choices=ServiceProvider.choices)
    category = models.TextField(choices=Category.choices, default=None, null=False)

    def __str__(self):
        return self.productName

class Transactions(models.Model):
    """
    This class is for inventory transaction type
    """
    transactionId = models.CharField(primary_key=True, default=None, max_length=32)
    personalId = models.ForeignKey(Homeless, on_delete=models.CASCADE)
    totalAmount = models.DecimalField(default=0.0, decimal_places=2, max_digits=8)


class TransactionDetails(models.Model):
    """
    This class is for inventory transaction details
    """
    transactionDetailId = models.CharField(primary_key=True, default=None, max_length=32)
    transactionId = models.ForeignKey(Transactions, on_delete=models.CASCADE, default=None)
    productId = models.ForeignKey(Product, on_delete=models.CASCADE)
    unitPurchased = models.IntegerField()

# Log table, used to display information on Case Worker page
# Log should be recorded whenever greeter swipes card
# Log should also be recorded whenever caseworker swipes card.
# Greeter should retrieve model based on the worker's info.
# datetime field can be retrieved relative to timezone and converted later.

class Log(models.Model):
    """
    This class is for client logs maintaining client transactions
    """
    datetime = models.DateTimeField(auto_now=False, auto_now_add=False, default=timezone.now)
    personalId = models.ForeignKey(Homeless, on_delete=models.CASCADE, default=None, related_name='Log_PersonalId')
    serviceProvider = models.TextField(choices=ServiceProvider.choices)
    clientName = models.CharField(max_length=500, blank=True, default="")


class UserNameAndIdMapping(models.Model):
    """
    This class is for mapping user name to database identification number
    """
    user_name = models.CharField(max_length=32, primary_key=True, unique=True)
    user_id = models.IntegerField()


class Appointments(models.Model):
    """
    This class is for client appointment details
    """
    personalId = models.ForeignKey(Homeless, on_delete=models.CASCADE)
    appointmentId = models.CharField(primary_key=True, default=None, max_length=32)
    office = models.CharField(max_length=500, blank=True, null=False)
    streetAddress1 = models.CharField(max_length=500, blank=True, null=False)
    streetAddress2 = models.CharField(max_length=500, blank=True, null=True)
    city = models.CharField(max_length=500, blank=True, null=False)
    zipCode = models.CharField(max_length=500, blank=True, null=False)
    state = models.CharField(max_length=500, blank=True, null=False)
    Time = models.TimeField(auto_now=False, auto_now_add=False)
    Date = models.DateField(auto_now=False, auto_now_add=False)
    serviceProvider = models.TextField(choices=ServiceProvider.choices)
    alert = models.BooleanField(default=False, null=True)
    Email = models.EmailField(max_length=70, blank=True, null=True)
    TimeZone = models.CharField(max_length=200, blank=True, null=True)
    # is the way to determine what task id is being used, only > -1 if alert == True
    AlertTaskID = models.CharField(max_length=36, default="", blank=True, null=True)


class SocialWorker(models.Model):
    """
    This class is for social worker information
    """
    class ClearanceLevel(models.TextChoices):
        """
        This class is for social worker clearance level
        """
        GREETER = "greeter", _("Greeter")
        CASEWORKER = "caseworker", _("CaseWorker")
        SERVICE_PROVIDER_EMPLOYEE = "service_provider", _("Service Provider Employee")
        CLIENT = "client", _("Client")
        ADMIN = "admin", _("Admin")

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    clearanceLevel = models.TextField(choices=ClearanceLevel.choices)
    address = models.CharField(max_length=500)
    serviceProvider = models.TextField(choices=ServiceProvider.choices)


class ProjectCategory(models.TextChoices):
    """
    This class is for HUD COC project categories
    """
    HUD_COC_HOMELESS_PREVENTION = 'HUD:CoC-HomelessPrevention', _('HUD:CoC-HomelessPrevention')
    HUD_COC_PERMANENT_SUPPORTIVE_HOUSING = 'HUD:COC-Permanent Supportive Housing', _(
        'HUD:COC-Permanent Supportive Housing')
    HUD_COC_RAPID_RE_HOUSING = 'HUD:COC-Rapid Re-Housing', _('HUD:COC-Rapid Re-Housing')
    HUD_COC_SUPPORTIVE_SERVICES_ONLY = 'HUD:CoC - Supportive Services Only', _('HUD:CoC - Supportive Services Only')
    HUD_COC_SSO_COORDINATED_ENTRY = 'HUD:CoC - SSO Coordinated Entry', _('HUD:CoC - SSO Coordinated Entry')
    HUD_COC_TRADITIONAL_HOUSING = 'HUD:CoC - Traditional Housing', _('HUD:CoC - Traditional Housing')
    HUD_COC_SAFE_HAVEN = 'HUD:CoC - Safe Haven', _('HUD:CoC - Safe Haven')
    HUD_COC_SINGLE_ROOM_OCCUPANCY = 'HUD:CoC - Single Room Occupancy', _('HUD:CoC - Single Room Occupancy')
    HUD_COC_YOUTH_HOMELESS_DEMONSTRATION_PROGRAM = 'HUD:CoC - Youth Homeless Demonstration Program', _(
        'HUD:CoC - Youth Homeless Demonstration Program')
    HUD_COC_JOINT_COMPONENT_TH_RRH = 'HUD:CoC - Joint Component TH/RRH', _('HUD:CoC - Joint Component TH/RRH')
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
    VA_HCHVCRS_EH = 'VA: HCHV CRS - EH', _('VA: HCHV CRS - EH')
    VA_HCHV_LOW_DEMAND_SAFE_HAVEN = 'VA: HCHV - Low Demand Safe Haven', ('VA: HCHV - Low Demand Safe Haven')
    VA_GRANT_PER_DIEM_BRIDGE_HOUSING = 'VA:Grant Per Diem – Bridge Housing', ('VA:Grant Per Diem – Bridge Housing')
    VA_GRANT_PER_DIEM_LOW_DEMAND = 'VA:Grant Per Diem – Low Demand', _('VA:Grant Per Diem – Low Demand')
    VA_GRANT_PER_DIEM_HOSPITAL_TO_HOUSING = 'VA:Grant Per Diem – Hospital to Housing', _(
        'VA:Grant Per Diem – Hospital to Housing')
    VA_GRANT_PER_DIEM_CLINICAL_TREATMENT = 'VA:Grant Per Diem – Clinical Treatment', _(
        'VA:Grant Per Diem – Clinical Treatment')
    VA_GRANT_PER_DIEM_SERVICE_INTENSIVE_TRANSITIONAL_HOUSING = 'VA:Grant Per Diem – Service Intensive Transitional Housing', _(
        'VA:Grant Per Diem – Service Intensive Transitional Housing')
    VA_GRANT_PER_DIEM_TRANSITION_IN_PLACE = 'VA:Grant Per Diem – Transition in Place', _(
        'VA:Grant Per Diem – Transition in Place')
    VA_GRANT_PER_DIEM_CASE_MANAGEMENT_OR_HOUSING_RETENTION = 'VA:Grant Per Diem – Case Management / Housing Retention', _(
        'VA:Grant Per Diem – Case Management / Housing Retention')
    VA_SSVF_HOMELESSNESS_PREVENTION = 'VA: SSVF - Homelessness Prevention', _('VA: SSVF - Homelessness Prevention')
    VA_SSVF_RAPID_RE_HOUSING = 'VA: SSVF - Rapid Re-Housing', _('VA: SSVF - Rapid Re-Housing')


class SubstanceAbuseCategory(models.IntegerChoices):
    """
    This class is for substance abuse category
    """
    NO = 0, _('No')
    ALCOHOL = 1, _('Alcohol')
    DRUG = 2, _('Drug')
    BOTH = 3, _('Both Drug and Alcohol')
    CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
    CLIENT_REFUSED = 9, _('Client Refused')
    DATA_NOT_COLLECTED = 99, _('Data Not Collected')


class DomesticViolenceOccurrence(models.IntegerChoices):
    """
    This class is for domestic violence occurrence duration options
    """
    PAST_THREE_MONTHS = 1, _('Past 3 Months')
    THREE_TO_SIX_MONTHS = 2, _('Three to six months ago')
    SIX_MONTHS_TO_ONE_YEAR = 3, _('Six Months to One year')
    ONE_YEAR_OR_MORE = 4, _('One year or more')
    CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
    CLIENT_REFUSED = 9, _('Client Refused')
    DATA_NOT_COLLECTED = 99, _('Data Not Collected')


class Enrollment(models.Model):
    """
    This class is for enrollment information
    """
    DisablingCondition = models.IntegerField(choices=YesNoResponse.choices, default=YesNoResponse.NO)
    EnrollmentID = models.CharField(max_length=32, primary_key=True, default=None)
    PersonalId = models.ForeignKey(Homeless, on_delete=models.CASCADE, default=None,
                                   related_name='Enrollment_PersonalId')
    ProjectCategory = models.TextField(choices=ProjectCategory.choices, default=None, null=True)
    EntryDate = models.DateField(null=True)
    ExitDate = models.DateField(null=True)


class HealthInsurance(models.Model):
    """
    This class is for health insurance information
    """
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
    """
    This class is for non cash benefits information
    """
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
    """
    This class is for domestic violence victim information
    """
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='DomesticViolence_EnrollmentID')
    InformationDate = models.DateField()
    DomesticViolenceVictim = models.IntegerField(choices=YesNoResponse.choices)
    WhenOccurred = models.IntegerField(choices=DomesticViolenceOccurrence.choices)
    CurrentlyFleeing = models.IntegerField(choices=ResponseCategory.choices)


class DisablingCondition(models.Model):
    """
    This class is for client disability condition
    """
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


class IncomeAndSources(models.Model):
    """
    This class is for domestic violence occurrence duration options
    """
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
    """
    This class is for HOPWA information
    """
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
    """
    This class is for financial assistance HOPWA
    """
    class FinancialAssistanceTypeCategory(models.IntegerChoices):
        """
        This class is for financial assistance category type
        """
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
    """
    This class is for medical assistance HOPWA
    """
    class IfNoReasonTypeCategory(models.IntegerChoices):
        """
        This class is for medical assistance HOPWA applied status
        """
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
    """
    This class is for financial assistance HOPWA
    """
    class InformationObtainedResponseCategory(models.IntegerChoices):
        """
        This class is for reprt type
        """
        MEDICAL_REPORT = 1, _('Medical Report')
        CLIENT_REPORT = 2, _('Client Report')
        OTHER = 3, _('Other')

    InformationDate = models.DateField()
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='TCellCD4AndViralLoadHOPWA_EnrollmentID',
                                     default=None)
    TCellCD4CountAvailable = models.IntegerField(choices=ResponseCategory.choices)
    IfYesTCellCount = models.IntegerField(validators=[MaxValueValidator(1500), MinValueValidator(0)])
    HowWasTheInformationObtained = models.IntegerField(choices=InformationObtainedResponseCategory.choices)
    ViralLoadInformationAvailable = models.IntegerField(choices=ResponseCategory.choices)
    ViralLoadCount = models.IntegerField(validators=[MaxValueValidator(999999), MinValueValidator(0)])


class HousingAssessmentAtExitHOPWA(models.Model):
    """
    This class is for housing assessment at exit HOPWA information
    """
    class HousingAssessmentAtExitResponseCategory(models.IntegerChoices):
        """
        This class is for housing assessment at exit HOPWA response category
        """
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
        """
        This class is for housing assessment at exit HOPWA subsidy response information
        """
        WITHOUT_A_SUBSIDY = 1, _('Without_a_subsidy')
        WITH_THE_SUBSIDY_THEY_HAD_AT_PROJECT_ENTRY = 2, _('With the subsidy they had at project entry')
        WITH_AN_ONGOING_SUBSIDY_ACQUIRED_SINCE_PROJECT_ENTRY = 3, _(
            'With an ongoing subsidy acquired since project entry')
        ONLY_WITH_FINANCIAL_ASSISTANCE_OTHER_THAN_A_SUBSIDY = 4, _(
            'Only with financial assistance other than a subsidy')

    class AnotherSubsidyInformationResponseCategory(models.IntegerChoices):
        """
        This class is for housing assessment at exit HOPWA subsidy response information
        """
        WITH_ONGOING_SUBSIDY = 1, _('With ongoing subsidy')
        WITHOUT_AN_ONGOING_SUBSIDY = 2, _('Without an ongoing subsidy')

    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='HousingAssessmentAtExitHOPWA_EnrollmentID',
                                     default=None)
    HousingAssessmentAtExit = models.IntegerField(choices=HousingAssessmentAtExitResponseCategory.choices)
    SubsidyInformation = models.IntegerField(choices=SubsidyInformationResponseCategory.choices)


class LivingSituationResponse(models.IntegerChoices):
    """
    This class is for client living situation type
    """
    HOMELESS_SITUATION = 1, _("Homeless")
    INSTITUTIONAL_SITUATION = 2, _("Institutional Housing")
    TEMPORARY_AND_PERMANENT_HOUSING_SITUATION = 3, _("Temporary or Permanent Housing")
    OTHER = 4, _("Other")


class CurrentLivingSituation(models.Model):
    """
    This class is for client living situation information
    """
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='CurrentLivingSituation_EnrollmentID',
                                     default=None)
    InformationDate = models.DateField()
    CurrentLivingSituation = models.IntegerField(choices=LivingSituationResponse.choices)
    VerifiedByProject = models.TextField(choices=ProjectCategory.choices)
    HasToLeaveCurrentSituation = models.IntegerField(choices=ResponseCategory.choices)
    HasASubsequentResidence = models.IntegerField(choices=ResponseCategory.choices)
    HasResourcesToObtainPermanentHousing = models.IntegerField(choices=ResponseCategory.choices)
    OwnershipInPermanentHousing = models.IntegerField(choices=ResponseCategory.choices)
    HasClientMoved = models.IntegerField(choices=ResponseCategory.choices)
    LocationDetails = models.TextField(blank=True, null=True)


class DateOfEngagement(models.Model):
    """
    This class is for Date 
    """
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='DateOfEngagement_EnrollmentID',
                                     default=None)
    DateOfEngagement = models.DateField()


class BedNightDate(models.Model):
    """
    This class is for Date 
    """
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='BedNightDate_EnrollmentID',
                                     default=None)
    BedNightDate = models.DateField()


class AssessmentTypeCategory(models.IntegerChoices):
    """
    This class is for appointment assessment category type 
    """
    PHONE = 1, _("Phone")
    VIRTUAL = 2, _("Virtual")
    IN_PERSON = 3, _("In Person")


class AssessmentLevelCategory(models.IntegerChoices):
    """
    This class is for appointment assessment level 
    """
    CRISIS_NEED_ASSESSMENT = 1, _("Crisis Need Assessment")
    HOUSING_NEED_ASSESSMENT = 2, _("Housing Need Assessment")


class PrioritizationStatusCategory(models.IntegerChoices):
    """
    This class is for appointment priority type 
    """
    ON_PRIORITY_LIST = 1, _("On Priority List")
    NOT_ON_PRIORITY_LIST = 2, _("Not on Priority List")


class CoordinatedEntryAssessment(models.Model):
    """
    This class is for appointment coordinated assessment entry
    """
    DateOfAssessment = models.DateField()
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='CoordinatedEntryAssessment_EnrollmentID', default=None)
    AssessmentLocation = models.TextField(max_length=250)  # Admin-managed list of locations
    AssessmentType = models.IntegerField(choices=AssessmentTypeCategory.choices)
    AssessmentLevel = models.IntegerField(choices=AssessmentLevelCategory.choices)
    AssessmentQuestion = models.TextField(max_length=250)
    AssessmentAnswer = models.TextField(max_length=250)
    AssessmentResultType = models.TextField(max_length=250)
    AssessmentResult = models.TextField(max_length=250)
    PrioritizationStatus = models.IntegerField(choices=PrioritizationStatusCategory.choices)


class EventCategoryType(models.IntegerChoices):
    """
    This class is for event category
    """
    PREVENTION_ASSISTANCE = 1, _("Referral to a Prevention Assistance project")
    DIVERSION_OR_RAPID_RESOLUTION = 2, _("Problem Solving/Diversion/Rapid Resolution intervention or service")
    COORDINATED_ENTRY_CRISIS_ASSESSMENT = 3, _("Scheduled Coordinated Entry Crisis Assessment")
    COORDINATED_ENTRY_HOUSING_NEED_ASSESSMENT = 4, _("Scheduled Coordinated Entry Housing Needs Assessment")
    CASE_MANAGEMENT = 5, _("Post Placement/ Follow-up Case Management")
    STREET_OUTREACH = 6, _("Street Outreach Project or Services")
    HOUSING_NAVIGATION = 7, _("Housing Navigation Project or Services")
    INELIGIBLE_CONTINUUM_SERVICES = 8, _("Ineligible for continuum services")
    NA_CONTINUUM_SERVICES = 9, _("No availability in continuum services")
    EMERGENCY_SHELTER = 10, _("Emergency Shelter bed opening")
    TRANSITIONAL_HOUSING = 11, _("Transitional Housing bed/unit opening")
    JOINT_TH_RRH = 12, _("Joint TH-RRH project/unit/resource opening")
    RRH_PROJECT_RESOURCE = 13, _("RRH Project Resource Opening")
    PSH_PROJECT_RESOURCE = 14, _("PSH Project Resource Opening")
    OTHER_PROJECT = 15, _("Other Project/Unit/Resource Opening")


class ReferralResultCategory(models.IntegerChoices):
    """
    This class is for referral result type 
    """
    CLIENT_ACCEPTED = 1, _("Successful Referral: Client Accepted")
    CLIENT_REJECTED = 2, _("Unsuccessful Referral: Client Rejected")
    PROVIDER_REJECTED = 3, _("Unsuccessful Referral: Provider Rejected")


class CoordinatedEntryEvent(models.Model):
    """
    This class is for coordinate entry event information 
    """
    DateOfEvent = models.DateField()
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='CoordinatedEntryEvent_EnrollmentID', default=None)
    Event = models.IntegerField(choices=EventCategoryType.choices)
    ClientHousedOrReHoused = models.CharField(choices=YesNoResponse.choices, max_length=3)
    EnrolledInAfterCareProject = models.CharField(choices=YesNoResponse.choices, max_length=3)
    LocationOfHousing = models.TextField(choices=ProjectCategory.choices)
    ReferralResult = models.IntegerField(choices=ReferralResultCategory.choices)
    DateOfResult = models.DateField()


class SexualOrientationCategory(models.IntegerChoices):
    """
    This class is for sexual orientation type 
    """
    HETEROSEXUAL = 1, _("Heterosexual")
    GAY = 2, _("Gay")
    LESBIAN = 3, _("Lesbian")
    BISEXUAL = 4, _("Bisexual")
    UNSURE = 5, _("Questioning / Unsure")
    OTHERS = 6, _("Others")
    CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
    CLIENT_REFUSED = 9, _('Client Refused')
    DATA_NOT_COLLECTED = 99, _('Data Not Collected')


class SexualOrientation(models.Model):
    """
    This class is for coordinate entry event information 
    """
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='SexualOrientation_EnrollmentID', default=None)
    SexualOrientation = models.IntegerField(choices=SexualOrientationCategory.choices)
    Description = models.TextField()


# VETERAN PROJECT MODELS

class VeteranInformation(models.Model):
    """
    This class is for veteran project information 
    """
    class MilitaryBranchCategory(models.IntegerChoices):
        """
        This class is for veteran military branch information 
        """
        ARMY = 1, _('Army')
        AIRFORCE = 2, _('Air Force')
        NAVY = 3, _('Navy')
        MARINES = 4, _('Marines')
        COASTGUARD = 6, _('Coast Guard')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    class DischargeStatusCategory(models.IntegerChoices):
        """
        This class is for veteran discharge icategory nformation 
        """
        HONORABLE = 1, _('Honorable')
        GENERAL_UNDER_HONORABLE_CONDITIONS = 2, _('General under honorable conditions')
        UNDER_OTHER_THAN_HONORABLE_CONDITIONS = 6, _('Under other than honorable conditions (OTH)')
        BAD_CONDUCT = 4, _('Bad conduct')
        DISHONORABLE = 5, _('Dishonorable')
        UNCHARACTERIZED = 7, _('Uncharacterized')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='VeteranInformation_EnrollmentID', default=None)
    YearEnteredMilitaryService = models.PositiveIntegerField()
    YearSeparatedFromMilitaryService = models.PositiveIntegerField()
    TheatreOfOperations_WorldWar2 = models.IntegerField(choices=ResponseCategory.choices)
    TheatreOfOperations_KoreanWar = models.IntegerField(choices=ResponseCategory.choices)
    TheatreOfOperations_VietnamWar = models.IntegerField(choices=ResponseCategory.choices)
    TheatreOfOperations_PersianGulfWar = models.IntegerField(choices=ResponseCategory.choices)
    TheatreOfOperations_Afghanistan = models.IntegerField(choices=ResponseCategory.choices)
    TheatreOfOperations_Iraq_IraqiFreedom = models.IntegerField(choices=ResponseCategory.choices)
    TheatreOfOperations_Iraq_NewDawn = models.IntegerField(choices=ResponseCategory.choices)
    TheatreOfOperations_OtherPeacekeepingOperations = models.IntegerField(
        choices=ResponseCategory.choices)
    BranchOfMilitary = models.IntegerField(choices=MilitaryBranchCategory.choices)
    DischargeStatus = models.IntegerField(choices=DischargeStatusCategory.choices)


class ServicesProvidedSSVF(models.Model):
    """
    This class is for service provider SSVF information 
    """
    class TypeOfServiceCategory(models.IntegerChoices):
        """
        This class is for service category
        """
        OUTREACH_SERVICES = 1, _('Outreach services')
        CASE_MANAGEMENT_SERVICES = 2, _('Case management services')
        ASSISTANCE_OBTAINING_VA_BENEFITS = 3, _('Assistance obtaining VA benefits')
        ASSISTANCE_OBTAINING_OR_COORDINATING_OTHER_PUBLIC_BENEFITS = 4, _(
            'Assistance obtaining/coordinating other public benefits')
        DIRECT_PROVISION_OF_OTHER_PUBLIC_BENEFITS = 5, _('Direct provision of other public benefits')
        OTHER_SUPPORTIVE_SERVICE_APPROVED_BY_VA = 6, _('Other (non TFA)supportive service approved by VA')
        EXTENDED_SHALLOW_SUBSIDY = 7, _('Extended Shallow Subsidy')
        RETURNING_HOME = 8, _('Returning Home')
        RAPID_RESOLUTION = 9, _('Rapid Resolution')

    class IfAssistanceObtainingVABenefitsCategory(models.IntegerChoices):
        """
        this class is for VA benefits category information 
        """
        VA_VOCATIONAL_AND_REHABILITATION_COUNSELING = 1, _('VA vocational and rehabilitation counseling')
        EMPLOYMENT_AND_TRAINING_SERVICES = 2, _('Employment and training services')
        EDUCATIONAL_ASSISTANCE = 3, _('Educational assistance')
        HEALTH_CARE_SERVICES = 4, _('Health care services')

    class IfAssistanceObtainingOrCoordinatingOtherPublicBenefitsCategory(models.IntegerChoices):
        """
        this class is for public benefits category information 
        """
        HEALTH_CARE_SERVICES = 1, _('Health care services')
        DAILY_LIVING_SERVICES = 2, _('Daily living services')
        PERSONAL_FINANCIAL_PLANNING_SERVICES = 3, _('Personal financial planning services')
        TRANSPORTATION_SERVICES = 4, _('Transportation services')
        INCOME_SUPPORT_SERVICES = 5, _('Income support services')
        FIDUCIARY_AND_REPRESENTATIVE_PAYEE_SERVICES = 6, _('Fiduciary and representative payee services')
        LEGAL_SERVICES_CHILD_SUPPORT = 7, _('Legal services - child support')
        LEGAL_SERVICES_EVICTION_PREVENTION = 8, _('Legal services - eviction prevention')
        LEGAL_SERVICES_OUTSTANDING_FINES_AND_PENALTIES = 9, _('Legal services - outstanding fines and penalties')
        LEGAL_SERVICES_RESTORE_OR_ACQUIRE_DRIVERS_LICENSE = 10, _('Legal services - restore/acquire drivers license')
        LEGAL_SERVICES_OTHER = 11, _('Legal services - other')
        CHILD_CARE = 12, _('Child care')
        HOUSING_COUNSELING = 13, _('Housing counseling')

    class IfDirectProvisionOfOtherPublicBenefitsCategory(models.IntegerChoices):
        """
        this class is for public benefits category information 
        """
        PERSONAL_FINANCIAL_PLANNING_SERVICES = 1, _('Personal financial planning services')
        TRANSPORTATION_SERVICES = 2, _('Transportation services')
        INCOME_SUPPORT_SERVICES = 3, _('Income support services')
        FIDUCIARY_AND_REPRESENTATIVE_PAYEE_SERVICES = 4, _('Fiduciary and representative payee services')
        LEGAL_SERVICES_CHILD_SUPPORT = 5, _('Legal services - child support')
        LEGAL_SERVICES_EVICTION_PREVENTION = 6, _('Legal services - eviction prevention')
        LEGAL_SERVICES_OUTSTANDING_FINES_AND_PENALTIES = 7, _('Legal services - outstanding fines and penalties')
        LEGAL_SERVICES_RESTORE_OR_ACQUIRE_DRIVERS_LICENSE = 8, _('Legal services - restore/acquire drivers license')
        LEGAL_SERVICES_OTHER = 9, _('Legal services - other')
        CHILD_CARE = 10, _('Child care')
        HOUSING_COUNSELING = 11, _('Housing counseling')

    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='ServicesProvidedSSVF_EnrollmentID', default=None)
    DateOfService = models.DateField()
    TypeOfService = models.IntegerField(choices=TypeOfServiceCategory.choices)
    IfAssistanceObtainingVABenefits = models.IntegerField(choices=IfAssistanceObtainingVABenefitsCategory.choices)
    IfAssistanceObtainingOrCoordinatingOtherPublicBenefits = models.IntegerField(
        choices=IfAssistanceObtainingOrCoordinatingOtherPublicBenefitsCategory.choices)
    IfDirectProvisionOfOtherPublicBenefits = models.IntegerField(
        choices=IfDirectProvisionOfOtherPublicBenefitsCategory.choices)
    IfOtherSupportiveServiceApprovedByVA = models.TextField()


class FinancialAssistanceSSVF(models.Model):
    """
    this class is for financial assistance SSVF information 
    """
    class FinancialAssistanceTypeCategory(models.IntegerChoices):
        """
        This class is for financial assistance SSVF category type 
        """
        RENTAL_ASSISTANCE = 1, _('Rental assistance')
        SECURITY_DEPOSITS = 2, _('Security deposit')
        UTILITY_DEPOSITS = 3, _('Utility deposit')
        UTILITY_FEE_PAYMENT_ASSISTANCE = 4, _('Utility fee payment assistance')
        MOVING_COSTS = 5, _('Moving costs')
        TRANSPORTATION_SERVICES_TOKEN_OR_VOUCHERS = 8, _('Transportation services: token/vouchers')
        TRANSPORTATION_SERVICES_VEHICLE_REPAIR_OR_MAINTENANCE = 9, _(
            'Transportation services: vehicle repair/maintenance')
        CHILD_CARE = 10, _('Child care')
        GENERAL_HOUSING_STABILITY_ASSISTANCE_EMERGENCY_SUPPLIES = 11, _(
            'General housing stability assistance - emergency supplies')
        GENERAL_HOUSING_STABILITY_ASSISTANCE_OTHER = 12, _('General housing stability assistance - other')
        EMERGENCY_HOUSING_ASSISTANCE = 14, _('Emergency housing assistance')
        EXTENDED_SHALLOW_SUBSIDY_RENTAL_ASSISTANCE = 15, _('Extended Shallow Subsidy - Rental Assistance')

    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='FinancialAssistanceSSVF_EnrollmentID', default=None)
    DateOfFinancialAssistance = models.DateField()
    FinancialAssistanceAmount = models.DecimalField(max_digits=8, decimal_places=2)
    FinancialAssistanceType = models.IntegerField(choices=FinancialAssistanceTypeCategory.choices)


class PercentOfAMI(models.Model):
    """
    This class is for amount income percentage
    """
    class HouseholdIncomeAsAPercentageOfAMICategory(models.IntegerChoices):
        """
        This class is for household amount income percentage
        """
        LESS_THAN_THIRTY_PERCENTAGE = 1, _('Less than 30%')
        THIRTY_PERCENTAGE_TO_FIFTY_PERCENTAGE = 2, _('30% to 50%')
        GREATER_THAN_FIFTY_PERCENTAGE = 3, _('Greater than 50%')

    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='PercentOfAMI_EnrollmentID', default=None)
    HouseholdIncomeAsAPercentageOfAMI = models.IntegerField(choices=HouseholdIncomeAsAPercentageOfAMICategory.choices)


class LastPermanentAddress(models.Model):
    """
    This class is for last permanent address information
    """
    class AddressDataQualityCategory(models.IntegerChoices):
        """
        This class is for address data quality category
        """
        FULL_ADDRESS_REPORTED = 1, _('Full address reported')
        INCOMPLETE_OR_ESTIMATED_ADDRESS_REPORTED = 2, _('Incomplete or estimated address reported')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='LastPermanentAddress_EnrollmentID', default=None)
    StreetAddress = models.TextField()
    City = models.TextField()
    State = models.TextField()
    ZipCode = models.TextField()
    AddressDataQuality = models.IntegerField(choices=AddressDataQualityCategory.choices)


# class VAMCStationNumber(models.Model):

class SSVFHPTargetingCriteria(models.Model):
    """
    This class is for SSVFHPT criteria
    """
    class CurrentHousingLossExpectedWithinCategory(models.IntegerChoices):
        """
        This class is for housing loss days information
        """
        ZERO_TO_SIX_DAYS = 0, _('0-6 days')
        SEVEN_TO_THIRTEEN_DAYS = 1, _('7-13 days')
        FOURTEEN_TO_TWENTYONE_DAYS = 2, _('14-21 days')
        MORE_THAN_TWENTYONE_DAYS = 3, _('More than 21 days (0 points)')

    class AnnualHouseholdGrossIncomeAmountCategory(models.IntegerChoices):
        """
        This class is for annual household gross income amount category information
        """
        ZERO_TO_FOURTEEN_PERC_OF_AREA_MEDIAN_INCOME = 0, _('0-14% of Area Median Income (AMI) for household size')
        FIFTEEN_TO_THIRTY_PERC_OF_AMI = 1, _('15-30% of AMI for household size')
        MORE_THAN_THIRTY_PERC_OF_AMI = 2, _('More than 30% of AMI for household size (0 points)')

    class RentalEvictionsWithinThePastSevenYearsCategory(models.IntegerChoices):
        """
        This class is for rental evictions with in the past seven years category information
        """
        FOUR_OR_MORE_PRIOR_RENTAL_EVICTIONS = 0, _('4 or more prior rental evictions')
        TWO_TO_THREE_PRIOR_RENTAL_EVICTIONS = 1, _('2-3 prior rental evictions')
        ONE_PRIOR_RENTAL_EVICTION = 2, _('1 prior rental eviction')
        NO_PRIOR_RENTAL_EVICTION = 3, _('No prior rental eviction (0 points)')

    class HistoryOfLiteralHomelessnessCategory(models.IntegerChoices):
        """
        This class is for history of literal homelessness category information
        """
        FOUR_OR_MORE_TIMES = 0, _('4 or more times or total of at least 12 months in past three years')
        TWO_OR_THREE_TIMES = 1, _('2-3 times in past three years')
        ONE_TIME_IN_PAST_THREE_YEARS = 2, _('1 time in past three years')
        NONE = 3, _('None (0 points)')

    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='SSVFHPTargetingCriteria_EnrollmentID', default=None)
    ReferredByCoordinatedEntry = models.IntegerField(choices=YesNoResponse.choices)
    CurrentHousingLossExpectedWithin = models.IntegerField(choices=CurrentHousingLossExpectedWithinCategory.choices)
    CurrentHouseholdIncomeIsZeroDollars = models.IntegerField(choices=YesNoResponse.choices)
    AnnualHouseholdGrossIncomeAmount = models.IntegerField(choices=AnnualHouseholdGrossIncomeAmountCategory.choices)
    SuddenAndSignificantDecreaseIncashIncome = models.IntegerField(choices=YesNoResponse.choices)
    MajorChangeInHouseholdCompositionInPastTwelveMonths = models.IntegerField(choices=YesNoResponse.choices)
    RentalEvictionsWithinThePastSevenYears = models.IntegerField(
        choices=RentalEvictionsWithinThePastSevenYearsCategory.choices)
    CurrentlyAtRiskOfLosingATenantBasedHousingSubsidy = models.IntegerField(choices=YesNoResponse.choices)
    HistoryOfLiteralHomelessness = models.IntegerField(choices=HistoryOfLiteralHomelessnessCategory.choices)
    HeadOfHouseholdWithDisablingCondition = models.IntegerField(choices=YesNoResponse.choices)
    CriminalRecordForArsonDrugDealing = models.IntegerField(choices=YesNoResponse.choices)
    RegisteredSexOffender = models.IntegerField(choices=YesNoResponse.choices)
    AtLeastOneDependentChildUnderAgeSix = models.IntegerField(choices=YesNoResponse.choices)
    SingleParentWithMinorChild = models.IntegerField(choices=YesNoResponse.choices)
    HouseholdSizeOfFiveOrMore = models.IntegerField(choices=YesNoResponse.choices)
    AnyVeteranInHouseholdServedInIraqOrAfghanistan = models.IntegerField(choices=YesNoResponse.choices)
    FemaleVeteran = models.IntegerField(choices=YesNoResponse.choices)
    HPApplicantTotalPoints = models.IntegerField()
    GranteeTargetingThresholdScore = models.IntegerField()


class HUDVASHVoucherTracking(models.Model):
    """
    This class is for HUDVASHV voucher information
    """
    class VoucherChangeCategory(models.IntegerChoices):
        """
        This class is for voucher change category information
        """
        REFERRAL_PACKAGE_FORWARDED_TO_PHA = 1, _('Referral package forwarded to PHA')
        VOUCHER_DENIED_BY_PHA = 2, _('Voucher denied by PHA')
        VOUCHER_ISSUED_BY_PHA = 3, _('Voucher issued by PHA')
        VOUCHER_REVOKED_OR_EXPIRED = 4, _('Voucher revoked or expired')
        VOUCHER_IN_USE_VETERAN_MOVED_INTO_HOUSING = 5, _('Voucher in use- veteran moved into housing')
        VOUCHER_WAS_PORTED_LOCALLY = 6, _('Voucher was ported locally')
        VOUCHER_WAS_ADMINISTRATIVELY_ABSORBED_BY_NEW_PHA = 7, _('Voucher was administratively absorbed by new PHA')
        VOUCHER_WAS_CONVERTED_TO_HOUSING_CHOICE_VOUCHER = 8, _('Voucher was converted to Housing Choice Voucher')
        VETERAN_EXITED_VOUCHER_WAS_RETURNED = 9, _('Veteran exited - voucher was returned')
        VETERAN_EXITED_FAMILY_MAINTAINED_THE_VOUCHER = 10, _('0 Veteran exited - family maintained the voucher')
        VETERAN_EXITED_PRIOR_TO_EVERRECEIVING_A_VOUCHER = 11, _('Veteran exited - prior to ever receiving a voucher')
        OTHER = 12, _('Other')

    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='HUDVASHVoucherTracking_EnrollmentID', default=None)
    InformationDate = models.DateField()
    VoucherChange = models.IntegerField(choices=VoucherChangeCategory.choices)
    IfOther = models.TextField()


class HUDVASHExitInformation(models.Model):
    class CaseManagementExitReasonCategory(models.IntegerChoices):
        ACCOMPLISHED_GOALS = 1, _('Accomplished goals and /or obtained services and no longer needs CM')
        TRANSFERRED_TO_ANOTHER_HUDVASH_PROGRAM_SITE = 2, _('Transferred to another HUD - VASH program site')
        FOUND_OR_CHOSE_OTHER_HOUSING = 3, _('Found/chose other housing')
        DID_NOT_COMPLY_WITH_HUDVASH_CM = 4, _('Did not comply with HUD - VASH CM')
        EVICTION_OR_OTHER_HOUSING_RELATED_ISSUES = 5, _('Eviction and/or other housing related issues')
        UNHAPPY_WITH_HUD_VASH_HOUSING = 6, _('Unhappy with HUD-VASH housing')
        NO_LONGER_FINANCIALLY_ELIGIBLE_FOR_HUD_VASH_VOUCHER = 7, _(
            'No longer financially eligible for HUD-VASH voucher')
        NO_LONGER_INTERESTED_IN_PARTICIPATING_IN_THIS_PROGRAM = 8, _(
            'No longer interested in participating in this program')
        VETERAN_CANNOT_BE_LOCATED = 9, _('Veteran cannot be located')
        VETERAN_TOO_ILL_TO_PARTICIPATE_AT_THIS_TIME = 10, _('Veteran too ill to participate at this time')
        VETERAN_IS_INCARCERATED = 11, _('Veteran is incarcerated')
        VETERAN_IS_DECEASED = 12, _('Veteran is deceased')
        OTHER = 13, _('Other')

    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='HUDVASHExitInformation_EnrollmentID', default=None)
    CaseManagementExitReason = models.IntegerField(choices=CaseManagementExitReasonCategory.choices)
    IfOther = models.TextField()


# RHY and PATH models

class ConnectionWithSOAR(models.Model):
    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='ConnectionWithSOAR_EnrollmentID', default=None)
    ConnectionWithSOAR = models.IntegerField(choices=ResponseCategory.choices)


class LastGradeCompleted(models.Model):
    class LastGradeCompletedCategory(models.IntegerChoices):
        LESS_THAN_GRADE_FIVE = 1, _('Less than Grade 5')
        GRADES_FIVE_TO_SIX = 2, _('Grades 5-6')
        GRADES_SEVEN_EIGHT = 3, _('Grades 7-8 ')
        GRADES_NINE_TO_ELEVEN = 4, _('Grades 9-11')
        GRADE_TWELVE_OR_HIGH_SCHOOL_DIPLOMA = 5, _('Grade 12/High school diploma')
        SCHOOL_PROGRAM_DOES_NOT_HAVE_GRADE_LEVELS = 6, _('School program does not have grade levels')
        GED = 7, _('GED')
        SOME_COLLEGE = 10, _('Some college')
        ASSOCIATES_DEGREE = 11, _('Associates degree')
        BACHELORS_DEGREE = 12, _('Bachelors degree')
        GRADUATE_DEGREE = 13, _('Graduate degree')
        VOCATIONAL_CERTIFICATION = 14, _('Vocational Certification')
        CLIENT_DOESNOT_KNOW = 8, _('Client Doesn\'t Know')
        CLIENT_REFUSED = 9, _('Client Refused')
        DATA_NOT_COLLECTED = 99, _('Data Not Collected')

    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='LastGradeCompleted_EnrollmentID', default=None)
    LastGradeCompleted = models.IntegerField(choices=LastGradeCompletedCategory.choices)


class EmploymentStatus(models.Model):
    class TypeOfEmploymentCategory(models.IntegerChoices):
        FULL_TIME = 1, _('Full-time')
        PART_TIME = 2, _('Part-time')

    class WhyNotEmployedCategory(models.IntegerChoices):
        LOOKING_FOR_WORK = 1, _(' WhyNotEmployedCategory')
        UNABLE_TO_WORK = 2, _('Unable to work')
        NOT_LOOKING_FOR_WORK = 3, _('Not looking for work')

    EnrollmentID = models.ForeignKey(Enrollment, on_delete=models.CASCADE,
                                     related_name='EmploymentStatus_EnrollmentID', default=None)
    InformationDate = models.DateField()
    Employed = models.IntegerField(choices=YesNoResponse.choices)
    TypeOfEmployment = models.IntegerField(choices=TypeOfEmploymentCategory.choices)
    WhyNotEmployed = models.IntegerField(choices=WhyNotEmployedCategory.choices)
