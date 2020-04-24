#@author: Aditya Samant
#tests/factories.py

# get all models
from django.contrib.auth.models import User
from api.StreetCardServices import models
from factory import DjangoModelFactory, SubFactory
import string
from faker import Faker
import random
from api.StreetCardServices.utils import primary_key_generator
from datetime import date


fake = Faker()

#Factory for Homeless Model testing
class HomelessFactory(DjangoModelFactory):
    class Meta: 
        model = models.Homeless
    
    NameDataQuality = random.choice([1,2,8,9,99])
    PersonalId = primary_key_generator()
    FirstName = fake.first_name()
    MiddleName = fake.first_name()
    LastName = fake.last_name()
    NameSuffix = fake.suffix()
    SSN = fake.ssn()
    SSNDataQuality = random.choice([1,2,8,9,99])
    DOB = fake.date_of_birth()
    DOBDataQuality = random.choice([1,2,8,9,99])
    Race = random.choice([1,2,3,4,5,8,9,99])
    Ethnicity = random.choice([0,1,8,9,99])
    Gender = random.choice([0,1,3,4,5,8,9,99]) 
    VeteranStatus =random.choice([0,1,8,9,99]) 
    PhoneNumberPrefix = str(fake.random_int(0, 999)) # as this is a char field
    PhoneNumber = fake.phone_number()
    Email = fake.ascii_email() 

   

# Factory for Product Model Testing
class ProductFactory(DjangoModelFactory):
    class Meta:
        model = models.Product
    
    productName = fake.name()
    productId = primary_key_generator()
    costPerItem = round(random.uniform(0, 5000), ndigits=2) # Faker doesn't provide a means to get decimals
    unitsAvailable = fake.random_int(min=0)
    serviceProvider = random.choice(["FP", "DIC", "SH", "SK", "NA", "OTH"])
    category = random.choice(["footware", 
                              "winterwear", 
                              "meal_pass", 
                              "transport_pass",
                              "bags", "quilt" ])
   


# Factory for Transaction
class TransactionFactory(DjangoModelFactory):
    class Meta: 
        model = models.Transactions    

    transactionId = primary_key_generator()
    totalAmount = round(random.uniform(0, 5000), ndigits=2)
    personalId = SubFactory(HomelessFactory)

# Factory for Transaction Details
class TransactionDetailFactory(DjangoModelFactory):
    class Meta:
        model = models.TransactionDetails
    
    transactionDetailId = primary_key_generator()
    transactionId = SubFactory(TransactionFactory)
    productId = SubFactory(ProductFactory)
    unitPurchased = fake.random_int(min= 0)


class LogFactory(DjangoModelFactory):
    class Meta:
        model = models.Log
    datetime = fake.date_time()
    personalId = SubFactory(HomelessFactory)
    serviceProvider = random.choice(["FP", "DIC", "SH", "SK", "NA", "OTH"])    
    clientName = fake.name()

class UserIdMapFactory(DjangoModelFactory):
    class Meta:
        model= models.UserNameAndIdMapping
    user_name = primary_key_generator()
    user_id = fake.random_int(min=0)
    

# Factory for Appointments Table
class AppointmentsFactory(DjangoModelFactory):
    
    class Meta:
        model = models.Appointments
    
    personalId = SubFactory(HomelessFactory)
    appointmentId = primary_key_generator()
    office = fake.company()
    streetAddress1 = fake.street_address()
    streetAddress2 = fake.building_number()
    city = fake.city()
    zipCode = fake.postcode()
    state = fake.country_code()
    Time = fake.time()
    Date = fake.date()
    serviceProvider = random.choice(["FP", "DIC", "SH", "SK", "NA", "OTH"])
    alert = fake.boolean(chance_of_getting_true=50)
    Email = fake.email()
    TimeZone = fake.timezone()
    # is the way to determine what task id is being used, only > -1 if alert == True
    AlertTaskID = ""
    if(alert):
        AlertTaskID = str(fake.uuid4())
  

    

#Made to showcase 1-1 rel with SocialWorker
class UserFactory(DjangoModelFactory):
    class Meta:
       model  = User

    username = fake.first_name()+'.' + fake.last_name()
  


class SocialWorkerFactory(DjangoModelFactory):
    class Meta:
        model = models.SocialWorker
    
    clearanceLevel = random.choice(['greeter', 'caseworker', 'service_provider_emp', 'client'])
    serviceProvider = random.choice(["FP", "DIC", "SH", "SK", "NA", "OTH"]) 
    address = fake.address()
    user = SubFactory(UserFactory)

projectCategory = ['HUD:CoC-HomelessPrevention',
    'HUD:COC-Permanent Supportive Housing', 
    'HUD:COC-Rapid Re-Housing',
    'HUD:CoC - Supportive Services Only', 
    'HUD:CoC - SSO Coordinated Entry',
    'HUD:CoC - Traditional Housing',
    'HUD:CoC - Safe Haven',
    'HUD:CoC - Single Room Occupancy',
    'HUD:CoC - Youth Homeless Demonstration Program',
    'HUD:CoC - Joint Component TH/RRH',
    'HUD:HOPWA – Hotel/Motel Vouchers',
    'HUD:HOPWA – Housing Information',
    'HUD:HOPWA – Permanent Housing (facility based or TBRA)',
    'HUD:HOPWA – Permanent Housing Placement',
    'HUD:HOPWA – Short-Term Rent, Mortgage, Utility assistance',
    'HUD:HOPWA – Short-Term Supportive Facility',
    'HUD:HOPWA – Transitional Housing',
    'VA: HCHV CRS - EH',
    'VA: HCHV - Low Demand Safe Haven',
    'VA:Grant Per Diem – Bridge Housing',
    'VA:Grant Per Diem – Low Demand',
    'VA:Grant Per Diem – Hospital to Housing',
    'VA:Grant Per Diem – Clinical Treatment',
    'VA:Grant Per Diem – Service Intensive Transitional Housing',
    'VA:Grant Per Diem – Transition in Place', 
    'VA:Grant Per Diem – Case Management / Housing Retention',
    'VA: SSVF - Homelessness Prevention', 
    'VA: SSVF - Rapid Re-Housing']

class EnrollmentFactory(DjangoModelFactory):
    class Meta:
        model = models.Enrollment
    
    DisablingCondition = random.choice([0,1])
    EnrollmentID = primary_key_generator()
    PersonalId = SubFactory(HomelessFactory)
    ProjectCategory = random.choice(projectCategory)
    EntryDate = fake.date_between(start_date='-100y',end_date='today')
    ExitDate = fake.date_between_dates(date_start=EntryDate, date_end=date.today())

class InsuranceFactory(DjangoModelFactory):
    class Meta:
        model = models.HealthInsurance
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    InformationDate = fake.date()
    CoveredByHealthInsurance = random.choice([0,1,8,9,99])
    Medicaid = random.choice([0,1])
    Medicare = random.choice([0,1])
    SCHIP = random.choice([0,1])
    VAMedicalServices = random.choice([0,1])
    EmployerProvided = random.choice([0,1])
    COBRA=random.choice([0,1]) 
    PrivatePay = random.choice([0,1])
    StateHealthInsuranceForAdults = random.choice([0,1])
    IndianHealthServices = random.choice([0,1])
    OtherInsurance = random.choice([0,1])
    SpecifySource = fake.company() # dont know what this is for
    Reason = random.choice([1,2,3,4,8,9,99])

class NonCashBenefits(DjangoModelFactory):
    class Meta:
        model = models.NonCashBenefits
    
    InformationDate = fake.date()
    EnrollmentID = SubFactory(EnrollmentFactory)
    BenefitsFromAnySource =random.choice([0,1,8,9,99])
    SNAP =random.choice([0,1]) 
    WIC =random.choice([0,1]) 
    TANFChildCare =random.choice([0,1]) 
    TANFTransportation =random.choice([0,1]) 
    OtherTANF =random.choice([0,1]) 
    OtherSource =random.choice([0,1]) 
    SpecifySource =fake.company()
    RentalAssistanceOngoing =fake.random_int() 
    RentalAssistanceTemp = fake.random_int()
    DataCollectionStage = fake.random_int()

class DomesticViolenceFactory(DjangoModelFactory):
    class Meta:
        model = models.DomesticViolence
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    InformationDate = fake.date()
    DomesticViolenceVictim =random.choice([0,1])  
    WhenOccurred = random.choice([1,2,3,4,8,9,99])  
    CurrentlyFleeing = random.choice([0,1,8,9,99])

class DisablingConditionFactory(DjangoModelFactory):
    class Meta:
        model = models.DisablingCondition
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    InformationDate = fake.date()
    physical_disability =random.choice([0,1,8,9,99]) 
    physical_disability_impairing =random.choice([0,1,8,9,99])
    developmental_disability = random.choice([0,1,8,9,99])
    developmental_disability_impairing = random.choice([0,1,8,9,99])
    chronic_health = random.choice([0,1,8,9,99])
    chronic_health_impairing = random.choice([0,1,8,9,99])
    hiv_aids = random.choice([0,1,8,9,99])
    hiv_aids_impairing = random.choice([0,1,8,9,99])
    mental_health = random.choice([0,1,8,9,99])
    mental_health_impairing = random.choice([0,1,8,9,99])
    substance_abuse = random.choice([0,1,2,3,8,9,99])
    substance_abuse_impairing = random.choice([0,1,8,9,99])

class IncomeNSourcesFactory(DjangoModelFactory):
    class Meta:
        model = models.IncomeAndSources
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    InformationDate = fake.date()
    IncomeFromAnySources =random.choice([0,1,8,9,99]) 
    Earned =random.choice([0,1]) 
    EarnedIncome = fake.random_int(min=0)
    Unemployment = random.choice([0,1])
    UnemploymentAmount = fake.random_int(min=0) 
    SSI =random.choice([0,1]) 
    SSIAmount = fake.random_int(min=0) 
    SSDI =random.choice([0,1]) 
    SSDIAmount =fake.random_int(min=0) 
    VADisabilityService =random.choice([0,1]) 
    VADisabilityServiceAmount =fake.random_int(min=0) 
    VADisabilityNonService =random.choice([0,1]) 
    VADisabilityNonServiceNonAmount = fake.random_int(min=0)
    PrivateDisability =random.choice([0,1]) 
    PrivateDisabilityAmount =fake.random_int(min=0)
    WorkersComp =random.choice([0,1]) 
    WorkersCompAmount = fake.random_int(min=0)
    TANF =random.choice([0,1]) 
    TANFAmount = fake.random_int(min=0)
    GA =random.choice([0,1]) 
    GAAmount = fake.random_int(min=0)
    SocSecRetirement =random.choice([0,1]) 
    SocSecRetirementAmount = fake.random_int(min=0)
    Pension =random.choice([0,1]) 
    PensionAmount = fake.random_int(min=0)
    ChildSupport =random.choice([0,1]) 
    ChildSupportAmount = fake.random_int(min=0)
    Alimony =random.choice([0,1]) 
    AlimonyAmount = fake.random_int(min=0)
    OtherIncomeSources =random.choice([0,1]) 
    OtherIncomeSourcesAmount = fake.random_int(min=0)
    OtherIncomeSourcesIdentify = fake.company() 
    TotalMonthlyIncome = fake.random_int(min=0)


#Factory for W1ServicesProvidedHOPWA
class W1ServicesFactory(DjangoModelFactory):
    class Meta:
        model = models.W1ServicesProvidedHOPWA
    
    DateOfService = fake.date()
    TypeOfService = random.choice(list(range(1,15)))
    EnrollmentID = SubFactory(EnrollmentFactory)


class FinancialAssistanceFactory(DjangoModelFactory):
    class Meta:
        model = models.FinancialAssistanceHOPWA
    
    DateOfFinancialAssistance = fake.date()
    FinancialAssistanceType = random.choice([1,2,3,4,7])
    FinancialAssistanceAmount = fake.random_int(min=0)
    EnrollmentID = SubFactory(EnrollmentFactory)


class MedicalAssistanceFactory(DjangoModelFactory):
    class Meta:
        model = models.MedicalAssistanceHOPWA
    
    InformationDate = fake.date()
    ReceivingPublicHIVAIDSMedicalAssistance = random.choice([0,1,8,9,99])
    IfNoReason = random.choice([1,2,3,4,8,9,99])
    ReceivingAIDSDrugAssistanceProgram = random.choice([0,1,8,9,99])
    EnrollmentID = SubFactory(EnrollmentFactory)


class TCellFactory(DjangoModelFactory):
    class Meta:
        model = models.TCellCD4AndViralLoadHOPWA
    
    InformationDate = fake.date()
    EnrollmentID = SubFactory(EnrollmentFactory)
    TCellCD4CountAvailable =random.choice([0,1,8,9,99])
    IfYesTCellCount = fake.random_int(min=0, max=1500)
    HowWasTheInformationObtained = random.choice([1,2,3])
    ViralLoadInformationAvailable = random.choice([0,1,8,9,99])
    ViralLoadCount = fake.random_int(min=0, max=999999)

class HousingAssessmentAtExitFactory(DjangoModelFactory):
    class Meta:
        model = models.HousingAssessmentAtExitHOPWA
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    HousingAssessmentAtExit = random.choice((list(range(1,11))+[99]))
    SubsidyInformation = random.choice([1,2,3,4])


class CurrentLivingStatusFactory(DjangoModelFactory):
    
    class Meta:
        model = models.CurrentLivingSituation
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    InformationDate = fake.date()
    CurrentLivingSituation = random.choice([1,2,3,4])
    VerifiedByProject = random.choice(projectCategory)
    HasToLeaveCurrentSituation = random.choice([0,1,8,9,99])
    HasASubsequentResidence = random.choice([0,1,8,9,99])
    HasResourcesToObtainPermanentHousing = random.choice([0,1,8,9,99])
    OwnershipInPermanentHousing = random.choice([0,1,8,9,99])
    HasClientMoved = random.choice([0,1,8,9,99])
    LocationDetails = fake.address()


class DateofEngagementFactory(DjangoModelFactory):
    class Meta:
        model = models.DateOfEngagement
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    DateOfEngagement = fake.date()

class BedNightDateFactory(DjangoModelFactory):
    class Meta:
        model = models.BedNightDate
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    BedNightDate = fake.date()

class CoordinatedEntryAssessmentFactory(DjangoModelFactory):
    class Meta:
        model = models.CoordinatedEntryAssessment
    
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    AssessmentLocation = fake.text(max_nb_chars=250)  # Admin-managed list of locations
    AssessmentType = random.choice([1,2,3])
    AssessmentLevel = random.choice([1,2])
    AssessmentQuestion = fake.text(max_nb_chars=250)
    AssessmentAnswer = fake.text(max_nb_chars=250)
    AssessmentResultType = fake.text(max_nb_chars=250)
    AssessmentResult = fake.text(max_nb_chars=250)
    DateOfAssessment = fake.date()
    PrioritizationStatus = random.choice([1,2])



class CoordinatedEntryEventFactory(DjangoModelFactory):
    class Meta:
        model = models.CoordinatedEntryEvent
    
    DateOfEvent = fake.date_between(start_date='-100y', end_date='today')
    EnrollmentID = SubFactory(EnrollmentFactory)
    Event = random.choice(list(range(1,16)))
    ClientHousedOrReHoused = random.choice(['Yes', 'No'])
    EnrolledInAfterCareProject = random.choice(['Yes','No'])
    LocationOfHousing = random.choice(projectCategory)
    ReferralResult = random.choice([1,2,3])
    DateOfResult = fake.date_between_dates(date_start=DateOfEvent, date_end=date.today())


class SexualOrientationFactory(DjangoModelFactory):
    class Meta:
        model = models.SexualOrientation
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    SexualOrientation = random.choice([1,2,3,4,5,6,8,9,99])
    Description = fake.text()


class VeteranInfoFactory(DjangoModelFactory):
    class Meta:
        model = models.VeteranInformation
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    YearEnteredMilitaryService = fake.year()
    YearSeparatedFromMilitaryService = fake.year()
    TheatreOfOperations_WorldWar2 = random.choice([0,1,8,9,99])
    TheatreOfOperations_KoreanWar =random.choice([0,1,8,9,99]) 
    TheatreOfOperations_VietnamWar =random.choice([0,1,8,9,99]) 
    TheatreOfOperations_PersianGulfWar =random.choice([0,1,8,9,99]) 
    TheatreOfOperations_Afghanistan =random.choice([0,1,8,9,99]) 
    TheatreOfOperations_Iraq_IraqiFreedom =random.choice([0,1,8,9,99]) 
    TheatreOfOperations_Iraq_NewDawn =random.choice([0,1,8,9,99]) 
    TheatreOfOperations_OtherPeacekeepingOperations =random.choice([0,1,8,9,99]) 
    BranchOfMilitary = random.choice([1,2,3,4,6,8,9,99])
    DischargeStatus = random.choice([1,2,4,5,6,7,8,9,99])


class ServicesProvidedSSVFFactory(DjangoModelFactory):
    class Meta:
        model = models.ServicesProvidedSSVF
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    DateOfService = fake.date()
    TypeOfService = random.choice(list(range(1,10)))
    IfAssistanceObtainingVABenefits = random.choice([1,2,3,4])
    IfAssistanceObtainingOrCoordinatingOtherPublicBenefits = random.choice(list(range(1,14)))
    IfDirectProvisionOfOtherPublicBenefits = random.choice(list(range(1,12)))
    IfOtherSupportiveServiceApprovedByVA = fake.text()


class FinancialAssistanceSSVFFactory(DjangoModelFactory):
    class Meta:
        model = models.FinancialAssistanceSSVF
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    DateOfFinancialAssistance = fake.date()
    FinancialAssistanceAmount = round(random.uniform(0, 5000), ndigits=2) 
    FinancialAssistanceType = random.choice([1,2,3,4,5,8,9,10,11,12,14,15])


class PercentAMIFactory(DjangoModelFactory):
    class Meta:
        model = models.PercentOfAMI
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    HouseholdIncomeAsAPercentageOfAMI = random.choice([1,2,3])


class LastPermanentAddressFactory(DjangoModelFactory):
    class Meta:
        model = models.LastPermanentAddress
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    StreetAddress = fake.street_address()
    City = fake.city()
    State = fake.country_code()
    ZipCode =fake.postcode()
    AddressDataQuality = random.choice([1,2,8,9,99])


class SSVFHPTargetingCriteriaFactory(DjangoModelFactory):
    class Meta:
        model = models.SSVFHPTargetingCriteria
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    ReferredByCoordinatedEntry = random.choice([0,1])
    CurrentHousingLossExpectedWithin =random.choice([0,1,2,3])
    CurrentHouseholdIncomeIsZeroDollars =random.choice([0,1]) 
    AnnualHouseholdGrossIncomeAmount = random.choice([0,1,2])
    SuddenAndSignificantDecreaseIncashIncome =random.choice([0,1]) 
    MajorChangeInHouseholdCompositionInPastTwelveMonths =random.choice([0,1]) 
    RentalEvictionsWithinThePastSevenYears = random.choice([0,1,2,3])
    CurrentlyAtRiskOfLosingATenantBasedHousingSubsidy =random.choice([0,1]) 
    HistoryOfLiteralHomelessness = random.choice([0,1,2,3])
    HeadOfHouseholdWithDisablingCondition =random.choice([0,1]) 
    CriminalRecordForArsonDrugDealing =random.choice([0,1]) 
    RegisteredSexOffender =random.choice([0,1]) 
    AtLeastOneDependentChildUnderAgeSix =random.choice([0,1]) 
    SingleParentWithMinorChild =random.choice([0,1]) 
    HouseholdSizeOfFiveOrMore =random.choice([0,1]) 
    AnyVeteranInHouseholdServedInIraqOrAfghanistan =random.choice([0,1]) 
    FemaleVeteran =random.choice([0,1]) 
    HPApplicantTotalPoints = fake.random_int()
    GranteeTargetingThresholdScore = fake.random_int()


class HUDVASHVoucherTrackFactory(DjangoModelFactory):
    class Meta:
        model = models.HUDVASHVoucherTracking

    EnrollmentID = SubFactory(EnrollmentFactory)
    InformationDate = fake.date()
    VoucherChange = random.choice(list(range(1,13)))
    IfOther = fake.text()


class HUDVASHExitInformationFactory(DjangoModelFactory):
    class Meta:
        model = models.HUDVASHExitInformation

    EnrollmentID = SubFactory(EnrollmentFactory)
    CaseManagementExitReason = random.choice(list(range(1,14)))
    IfOther = fake.text()


class ConnectionWithSOARFatory(DjangoModelFactory):
    class Meta:
        model = models.ConnectionWithSOAR
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    ConnectionWithSOAR = random.choice([0,1,8,9,99])


class LastGradeCompletedFactory(DjangoModelFactory):
    class Meta:
        model = models.LastGradeCompleted
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    LastGradeCompleted = random.choice(list(range(1,15)) + [99])



class EmploymentStatusFactory(DjangoModelFactory):
    class Meta:
        model = models.EmploymentStatus
    
    EnrollmentID = SubFactory(EnrollmentFactory)
    InformationDate = fake.date()
    Employed = random.choice([0,1])
    TypeOfEmployment = random.choice([1,2])
    WhyNotEmployed = random.choice([1,2,3])
