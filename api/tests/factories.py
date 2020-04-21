#@author: Aditya Samant
#tests/factories.py

# get all models
from api.StreetCardServices.models import Homeless, Product, Transactions, TransactionDetails, Log, UserNameAndIdMapping, Appointments,\
    SocialWorker

from factory import DjangoModelFactory, SubFactory
import string
from faker import Faker
import random
from api.StreetCardServices.utils import primary_key_generator


fake = Faker()

#Factory for Homeless Model testing
class HomelessFactory(DjangoModelFactory):
    class Meta: 
        model = Homeless
    
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
    PhoneNumberPrefix = fake.random_int(0, 999)
    PhoneNumber = fake.phone_number()
    Email = fake.ascii_email() 

   

# Factory for Product Model Testing
class ProductFactory(DjangoModelFactory):
    class Meta:
        model = Product
    
    productName = fake.name()
    productId = primary_key_generator()
    costPerItem = round(random.uniform(0, 5000), ndigits=2) # Faker doesn't provide a means to get decimals
    unitsAvailable = fake.random_int(min=0)
    serviceProvider = random.choice(["FP", "DIC", "SH", "SK", "NA", "OTH"])

   


# Factory for Transaction
class TransactionFactory(DjangoModelFactory):
    class Meta: 
        model = Transactions    

    transactionId = primary_key_generator()
    totalAmount = fake.random_int(min=0)
    personalId = SubFactory(HomelessFactory)

# Factory for Transaction Details
class TransactionDetailFactory(DjangoModelFactory):
    class Meta:
        model = TransactionDetails
    
    transactionDetailId = primary_key_generator()
    transactionId = SubFactory(TransactionFactory)
    productId = SubFactory(ProductFactory)
    unitPurchased = fake.random_int(min= 0)


class LogFactory(DjangoModelFactory):
    class Meta:
        model = Log
    datetime = fake.date_time()
    personalId = SubFactory(HomelessFactory)
    serviceProvider = random.choice(["FP", "DIC", "SH", "SK", "NA", "OTH"])    
    clientName = fake.name()

class UserIdMapFactory(DjangoModelFactory):
    class Meta:
        model= UserNameAndIdMapping
    user_name = primary_key_generator()
    user_id = fake.random_int(min=0)


# Factory for Appointments Table
class AppointmentsFactory(DjangoModelFactory):
    
    class Meta:
        model = Appointments
    
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
    if(alert):
        AlertTaskID = str(fake.uuid4())
    else:
        AlertTaskID = ""

