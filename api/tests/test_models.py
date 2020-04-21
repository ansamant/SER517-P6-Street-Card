# @author: Aditya Saamnt
# Purpose: To unit test the database models created by django

from django.test import TestCase
import api.StreetCardServices.models
from .factories import HomelessFactory, ProductFactory, TransactionDetailFactory, TransactionFactory, LogFactory, UserIdMapFactory, \
AppointmentsFactory
import datetime, re, pytz
# Basic Check of HomelessTests
class HomelessTest(TestCase):
    def setUp(self):
        self.client = HomelessFactory()
    def test_vals(self):
        dq_list = [1,2,8,9,99]
        # test all dq values are within range
        self.assertTrue(self.client.NameDataQuality in dq_list)
        self.assertTrue(self.client.SSNDataQuality in dq_list) 
        self.assertTrue(self.client.DOBDataQuality in dq_list)
        self.assertTrue(self.client.Race in [1,2,3,4,5,8,9,99])
        self.assertTrue(self.client.Ethnicity in [0,1,8,9,99])
        self.assertTrue(self.client.Gender in [0,1,3,4,5,8,9,99])
        self.assertTrue(self.client.VeteranStatus in [0,1,8,9,99])
        self.assertEquals(len(self.client.PersonalId), 32)
        self.assertEqual(str(self.client), self.client.FirstName)


# Test Products and Transactions
class ProductTest(TestCase):
    def setUp(self):
        self.product = ProductFactory()
    # Ensure that product value is corret
    def test_product_is_created(self):
         
        self.assertEquals(str(self.product), self.product.productName)
        self.assertTrue(self.product.serviceProvider in ["FP", "DIC", "SH", "SK", "NA", "OTH"])
        self.assertTrue(self.product.costPerItem >= 0)
        self.assertEquals(len(self.product.productId), 32)
        self.assertTrue(self.product.unitsAvailable >= 0)




#Test Transaction
class TransactionTest(TestCase):
    def setUp(self):
        self.client = HomelessFactory()
        self.transaction = TransactionFactory(personalId=self.client)

    # Ensure that a proper transaction is made with a corresponding Client
    def test_transaction_is_created(self):
        
        self.assertEquals(self.transaction.personalId, self.client)
        self.assertTrue(self.transaction.totalAmount >= 0)
        self.assertEquals(len(self.transaction.transactionId), 32)


# Test Transaction Details
class TransactionDetailsTest(TestCase):
    def setUp(self):
        self.client = HomelessFactory()
        self.transaction = TransactionFactory(personalId= self.client)
        self.product = ProductFactory()
        self.td = TransactionDetailFactory(transactionId= self.transaction, productId=self.product)
    
    def test_transactionDetail_is_created(self):
        self.assertEquals(self.td.transactionId,self.transaction)
        self.assertEquals(self.td.productId, self.product)
        self.assertTrue(self.td.unitPurchased >= 0)
        self.assertEquals(len(self.td.transactionDetailId), 32)


#Test Log Details
class LogTest(TestCase):
   
    def setUp(self):
        self.client = HomelessFactory()
        self.log = LogFactory(personalId=self.client)

    def test_logDetail_is_created(self):
       self.assertTrue(isinstance(self.log.datetime,datetime.datetime))
       self.assertEqual(self.log.personalId, self.client)
       self.assertTrue(self.log.serviceProvider in ["FP", "DIC", "SH", "SK", "NA", "OTH"])


class UserNameNIdTest(TestCase):
   
    def setUp(self):
        self.uNi = UserIdMapFactory()
    def test_userNId_is_created(self):
        
        self.assertEquals(len(self.uNi.user_name), 32)
        self.assertTrue(self.uNi.user_id >=0)


class AppointmentsTest(TestCase):
    
    def setUp(self):
        self.client = HomelessFactory()
        self.appointments = AppointmentsFactory(personalId=self.client)
    
    def test_appointmentDetail_is_created(self):
        self.assertEqual(self.appointments.personalId, self.client)
        self.assertEqual(len(self.appointments.appointmentId), 32)
        self.assertTrue(re.match('\d{2}:\d{2}:\d{2}', self.appointments.Time))
        self.assertTrue((re.match('\d{4}-\d{2}-\d{2}', self.appointments.Date)))
        self.assertTrue(self.appointments.serviceProvider in ["FP", "DIC", "SH", "SK", "NA", "OTH"] )
        self.assertTrue(self.appointments.alert == True or self.appointments.alert == False)
        self.assertTrue(re.match(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", self.appointments.Email))
        self.assertTrue(re.match(r"(^[a-zA-Z]+|^[a-zA-Z]+/[a-zA-Z]+)", self.appointments.TimeZone))
        self.assertTrue(len(self.appointments.AlertTaskID) <= 36)
        self.assertTrue(len(self.appointments.AlertTaskID) > 0 if self.appointments.alert else len(self.AlertTaskID) == 0)

  