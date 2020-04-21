# @author: Aditya Saamnt
# Purpose: To unit test the database models created by django

from django.test import TestCase
import api.StreetCardServices.models
import string
#from .factories import HomelessFactory, ProductFactory, TransactionDetailFactory, TransactionFactory, LogFactory, UserIdMapFactory, \
# AppointmentsFactory, SocialWorkerFactory, UserFactory, EnrollmentFactory
from . import factories
import datetime, re, pytz
# Basic Check of HomelessTests
class HomelessTest(TestCase):
    def setUp(self):
        self.client = factories.HomelessFactory()
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
        self.product = factories.ProductFactory()
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
        self.client = factories.HomelessFactory()
        self.transaction = factories.TransactionFactory(personalId=self.client)

    # Ensure that a proper transaction is made with a corresponding Client
    def test_transaction_is_created(self):
        
        self.assertEquals(self.transaction.personalId, self.client)
        self.assertTrue(self.transaction.totalAmount >= 0)
        self.assertEquals(len(self.transaction.transactionId), 32)


# Test Transaction Details
class TransactionDetailsTest(TestCase):
    def setUp(self):
        self.client = factories.HomelessFactory()
        self.transaction = factories.TransactionFactory(personalId= self.client)
        self.product = factories.ProductFactory()
        self.td = factories.TransactionDetailFactory(transactionId= self.transaction, productId=self.product)
    
    def test_transactionDetail_is_created(self):
        self.assertEquals(self.td.transactionId,self.transaction)
        self.assertEquals(self.td.productId, self.product)
        self.assertTrue(self.td.unitPurchased >= 0)
        self.assertEquals(len(self.td.transactionDetailId), 32)


#Test Log Details
class LogTest(TestCase):
   
    def setUp(self):
        self.client =factories.HomelessFactory()
        self.log = factories.LogFactory(personalId=self.client)

    def test_logDetail_is_created(self):
       self.assertTrue(isinstance(self.log.datetime,datetime.datetime))
       self.assertEqual(self.log.personalId, self.client)
       self.assertTrue(self.log.serviceProvider in ["FP", "DIC", "SH", "SK", "NA", "OTH"])


class UserNameNIdTest(TestCase):
   
    def setUp(self):
        self.uNi = factories.UserIdMapFactory()
    def test_userNId_is_created(self):
        
        self.assertEquals(len(self.uNi.user_name), 32)
        self.assertTrue(self.uNi.user_id >=0)


class AppointmentsTest(TestCase):
    
    def setUp(self):
        self.client = factories.HomelessFactory()
        self.appointments = factories.AppointmentsFactory(personalId=self.client)
    
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
        self.assertTrue(len(self.appointments.AlertTaskID) > 0 if self.appointments.alert else len(self.appointments.AlertTaskID) == 0)


class SocialWorkerTest(TestCase):
    def setUp(self):
        self.user = factories.UserFactory()
        self.social = factories.SocialWorkerFactory(user=self.user)
    
    def test_social_worker_is_created(self):
        self.assertTrue(self.social.clearanceLevel in ['greeter', 'caseworker', 'service_provider_emp', 'client'])
        self.assertTrue(self.social.serviceProvider in ["FP", "DIC", "SH", "SK", "NA", "OTH"])
        self.assertEqual(self.user, self.social.user)

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
class EnrollmentTest(TestCase):
    def setUp(self):
        self.client = factories.HomelessFactory()
        self.enroll = factories.EnrollmentFactory(PersonalId=self.client)

    def test_enrollment_is_created(self):
        self.assertTrue(self.enroll.PersonalId, self.client)
        self.assertTrue(self.enroll.DisablingCondition == 0 or self.enroll.DisablingCondition == 1)
        self.assertEqual(len(self.enroll.EnrollmentID), 32)
        self.assertTrue(self.enroll.ProjectCategory in projectCategory)
        self.assertTrue((re.match('\d{4}-\d{2}-\d{2}', str(self.enroll.EntryDate))))
        self.assertTrue((re.match('\d{4}-\d{2}-\d{2}', str(self.enroll.ExitDate))))
        self.assertGreaterEqual(self.enroll.ExitDate, self.enroll.EntryDate)

class InsuranceTest(TestCase):
    def setUp(self):
       self.client = factories.HomelessFactory()
       self.enroll = factories.EnrollmentFactory(PersonalId=self.client)
       self.hi = factories.InsuranceFactory(EnrollmentID= self.enroll)
    
    def test_insurance_is_created(self):
        self.assertEqual(self.hi.EnrollmentID, self.enroll)
        self.assertTrue(re.match('\d{4}-\d{2}-\d{2}',self.hi.InformationDate))
        self.assertTrue(self.hi.CoveredByHealthInsurance in [0,1,8,9,99])
        self.assertTrue(self.hi.Medicaid in [0,1])
        self.assertTrue(self.hi.Medicare in [0,1])
        self.assertTrue(self.hi.SCHIP in [0,1])
        self.assertTrue(self.hi.VAMedicalServices in [0,1])
        self.assertTrue(self.hi.EmployerProvided in [0,1])       
        self.assertTrue(self.hi.COBRA in [0,1])
        self.assertTrue(self.hi.PrivatePay in [0,1])
        self.assertTrue(self.hi.StateHealthInsuranceForAdults in [0,1])
        self.assertTrue(self.hi.IndianHealthServices in [0,1])
        self.assertTrue(self.hi.OtherInsurance in [0,1])
        self.assertTrue(self.hi.Reason in [1,2,3,4,8,9,99])


class NonCashTest(TestCase):
    def setUp(self):
       self.client = factories.HomelessFactory()
       self.enroll = factories.EnrollmentFactory(PersonalId=self.client)
       self.ncb = factories.NonCashBenefits(EnrollmentID=self.enroll)
    
    def test_noncashbenefit_is_created(self):
        self.assertEqual(self.ncb.EnrollmentID, self.enroll)
        self.assertTrue(re.match('\d{4}-\d{2}-\d{2}',self.ncb.InformationDate))
        self.assertTrue(self.ncb.SNAP in [0,1])
        self.assertTrue(self.ncb.WIC in [0,1])
        self.assertTrue(self.ncb.TANFChildCare in [0,1])
        self.assertTrue(self.ncb.TANFTransportation in [0,1])
        self.assertTrue(self.ncb.OtherTANF in [0,1])
        self.assertTrue(self.ncb.OtherSource in [0,1])
        self.assertTrue(self.ncb.BenefitsFromAnySource in [0,1,8,9,99])

class DisablingConditionTest(TestCase):
    def setUp(self):
        self.client = factories.HomelessFactory()
        self.enroll = factories.EnrollmentFactory(PersonalId=self.client)
        self.dc = factories.DisablingConditionFactory(EnrollmentID=self.enroll) 
    
    def test_disablingCondition_is_create(self):
        self.assertEqual(self.enroll, self.dc.EnrollmentID)
        self.assertTrue(re.match('\d{4}-\d{2}-\d{2}',self.dc.InformationDate))
        self.assertTrue(self.dc.substance_abuse in [0,1,2,3,8,9,99])
        self.assertTrue(self.dc.substance_abuse_impairing in [0,1,8,9,99])
        self.assertTrue(self.dc.physical_disability in [0,1,8,9,99])
        self.assertTrue(self.dc.substance_abuse_impairing in [0,1,8,9,99])
        self.assertTrue(self.dc.chronic_health in [0,1,8,9,99])
        self.assertTrue(self.dc.chronic_health_impairing in [0,1,8,9,99])
        self.assertTrue(self.dc.developmental_disability in [0,1,8,9,99])
        self.assertTrue(self.dc.developmental_disability_impairing in [0,1,8,9,99])
        self.assertTrue(self.dc.hiv_aids in [0,1,8,9,99])
        self.assertTrue(self.dc.hiv_aids_impairing in [0,1,8,9,99])
        self.assertTrue(self.dc.mental_health in [0,1,8,9,99])
        self.assertTrue(self.dc.mental_health_impairing in [0,1,8,9,99])

class IncomeNSourcesTest(TestCase):
    def setUp(self):
        self.client = factories.HomelessFactory()
        self.enroll = factories.EnrollmentFactory(PersonalId=self.client)
        self.ins = factories.IncomeNSourcesFactory(EnrollmentID=self.enroll)
    
    def test_incomensrc_is_created(self):
        self.assertTrue(re.match('\d{4}-\d{2}-\d{2}',self.ins.InformationDate))
        self.assertEqual(self.enroll, self.ins.EnrollmentID) 
        self.assertTrue(self.ins.IncomeFromAnySources in [0,1,8,9,99])
        self.assertTrue(self.ins.Earned in [0,1])
        self.assertTrue(self.ins.Unemployment in [0,1])
        self.assertTrue(self.ins.SSI in [0,1])
        self.assertTrue(self.ins.SSDI in [0,1])
        self.assertTrue(self.ins.VADisabilityNonService in [0,1])
        self.assertTrue(self.ins.VADisabilityService in [0,1])
        self.assertTrue(self.ins.PrivateDisability in [0,1])
        self.assertTrue(self.ins.WorkersComp in [0,1])
        self.assertTrue(self.ins.TANF in [0,1])
        self.assertTrue(self.ins.GA in [0,1])
        self.assertTrue(self.ins.SocSecRetirement in [0,1])
        self.assertTrue(self.ins.Pension in [0,1])
        self.assertTrue(self.ins.ChildSupport in [0,1])
        self.assertTrue(self.ins.Alimony in [0,1])
        self.assertTrue(self.ins.OtherIncomeSources in [0,1])
        self.assertTrue(self.ins.EarnedIncome >= 0)
        self.assertTrue(self.ins.UnemploymentAmount >= 0)
        self.assertTrue(self.ins.SSIAmount >= 0)
        self.assertTrue(self.ins.SSDIAmount >= 0)
        self.assertTrue(self.ins.VADisabilityNonServiceNonAmount >= 0)
        self.assertTrue(self.ins.VADisabilityServiceAmount >= 0)
        self.assertTrue(self.ins.PrivateDisabilityAmount >= 0)
        self.assertTrue(self.ins.WorkersCompAmount >= 0)
        self.assertTrue(self.ins.TANFAmount >= 0)
        self.assertTrue(self.ins.GAAmount >= 0)
        self.assertTrue(self.ins.SocSecRetirementAmount >= 0)
        self.assertTrue(self.ins.PensionAmount >= 0)
        self.assertTrue(self.ins.ChildSupportAmount >= 0)
        self.assertTrue(self.ins.AlimonyAmount >= 0)
        self.assertTrue(self.ins.OtherIncomeSourcesAmount >= 0)
        
class W1ServicesTest(TestCase):
   
   def setUp(self):
       self.client = factories.HomelessFactory()
       self.enroll = factories.EnrollmentFactory(PersonalId=self.client)
       self.w1 = factories.W1ServicesFactory(EnrollmentID=self.enroll)
    
   def test_service_is_created(self):
       self.assertTrue(re.match('\d{4}-\d{2}-\d{2}',self.w1.DateOfService))
       self.assertTrue(self.w1.TypeOfService >= 1 and self.w1.TypeOfService < 15)
       self.assertEqual(self.w1.EnrollmentID, self.enroll) 
    

class FinancialAssiatanceTest(TestCase):
   
   def setUp(self):
       self.client = factories.HomelessFactory()
       self.enroll = factories.EnrollmentFactory(PersonalId=self.client)
       self.assist = factories.FinancialAssistanceFactory(EnrollmentID=self.enroll) 
    
   def test_financialAssistance_is_created(self):
      self.assertTrue(re.match('\d{4}-\d{2}-\d{2}',self.assist.DateOfFinancialAssistance))
      self.assertEqual(self.assist.EnrollmentID, self.enroll)  
      self.assertTrue(self.assist.FinancialAssistanceType in [1,2,3,4,7])
      self.assertTrue(self.assist.FinancialAssistanceAmount >= 0)


class MedicalAssistanceTest(TestCase):
    def setUp(self):
       self.client = factories.HomelessFactory()
       self.enroll = factories.EnrollmentFactory(PersonalId=self.client)
       self.medical = factories.MedicalAssistanceFactory(EnrollmentID=self.enroll)
    
    def test_medicalAssistance_is_created(self):
       self.assertTrue(re.match('\d{4}-\d{2}-\d{2}',self.medical.InformationDate)) 
       self.assertTrue(self.medical.ReceivingPublicHIVAIDSMedicalAssistance in [0,1,8,9,99]) 
       self.assertTrue(self.medical.ReceivingAIDSDrugAssistanceProgram in [0,1,8,9,99])  
       self.assertEquals(self.medical.EnrollmentID, self.enroll)
    
class TCellTest(TestCase):
   def setUp(self):
       self.client = factories.HomelessFactory()
       self.enroll = factories.EnrollmentFactory(PersonalId=self.client)
       self.tcell = factories.TCellFactory(EnrollmentID=self.enroll)
     
   def test_tcell_is_created(self):
      self.assertEquals(self.tcell.EnrollmentID, self.enroll)
      self.assertTrue(re.match('\d{4}-\d{2}-\d{2}',self.tcell.InformationDate))
      self.assertTrue(self.tcell.TCellCD4CountAvailable in [0,1,8,9,99])  
      self.assertTrue(self.tcell.ViralLoadInformationAvailable in [0,1,8,9,99])
      self.assertTrue(self.tcell.ViralLoadCount >=0 and self.tcell.ViralLoadCount <= 999999)
      self.assertTrue(self.tcell.HowWasTheInformationObtained  in [1,2,3])
      self.assertTrue(self.tcell.IfYesTCellCount >=0 and self.tcell.IfYesTCellCount <=1500)


class HousingAssessmentTest(TestCase):
   
   def setUp(self):
       self.client = factories.HomelessFactory()
       self.enroll = factories.EnrollmentFactory(PersonalId=self.client)
       self.house = factories.HousingAssessmentAtExitFactory(EnrollmentID=self.enroll)

   def test_housingAssessment_is_created(self):
       self.assertEqual(self.house.EnrollmentID, self.enroll)
       self.assertTrue(self.house.HousingAssessmentAtExit in (list(range(1,11))+[99]))
       self.assertTrue(self.house.SubsidyInformation in list(range(1,5)))


class CurrentLivingStatusTest(TestCase):
    def setUp(self):
       self.client = factories.HomelessFactory()
       self.enroll = factories.EnrollmentFactory(PersonalId=self.client)
       self.cls = factories.CurrentLivingStatusFactory(EnrollmentID=self.enroll)
    
    def test_livingStatus_is_created(self):
        self.assertEqual(self.cls.EnrollmentID, self.enroll) 
        self.assertTrue(re.match('\d{4}-\d{2}-\d{2}',self.cls.InformationDate))
        self.assertTrue(self.cls.VerifiedByProject in projectCategory)
        self.assertTrue(self.cls.CurrentLivingSituation in [1,2,3,4])
        self.assertTrue(self.cls.HasToLeaveCurrentSituation in [0,1,8,9,99])
        self.assertTrue(self.cls.HasASubsequentResidence in [0,1,8,9,99])
        self.assertTrue(self.cls.HasResourcesToObtainPermanentHousing in [0,1,8,9,99])
        self.assertTrue(self.cls.OwnershipInPermanentHousing in [0,1,8,9,99])
        self.assertTrue(self.cls.HasClientMoved in [0,1,8,9,99])

class DateOfEntryTest(TestCase):
   def setUp(self):
        self.client = factories.HomelessFactory()
        self.enroll = factories.EnrollmentFactory(PersonalId=self.client)
        self.doe = factories.DateofEngagementFactory(EnrollmentID=self.enroll)
    
   def test_dateofengagement_is_created(self):
        self.assertEqual(self.doe.EnrollmentID, self.enroll)
        self.assertTrue(re.match('\d{4}-\d{2}-\d{2}',self.doe.DateOfEngagement))


class BedNightDateTest(TestCase):
   def setUp(self):
        self.client = factories.HomelessFactory()
        self.enroll = factories.EnrollmentFactory(PersonalId=self.client)
        self.bed = factories.BedNightDateFactory(EnrollmentID=self.enroll) 
    
   def test_bedNightDate_is_created(self):
        self.assertEqual(self.bed.EnrollmentID, self.enroll)
        self.assertTrue(re.match('\d{4}-\d{2}-\d{2}',self.bed.BedNightDate)) 


class CoordinatedEntryAssessmentTest(TestCase):
   def setUp(self):
        self.client = factories.HomelessFactory()
        self.enroll = factories.EnrollmentFactory(PersonalId=self.client)
        self.assess = factories.CoordinatedEntryAssessmentFactory(EnrollmentID=self.enroll) 
    
   def test_coordinatedAssessment_is_created(self):
        self.assertEqual(self.assess.EnrollmentID, self.enroll)
        self.assertTrue(re.match('\d{4}-\d{2}-\d{2}',self.assess.DateOfAssessment)) 
        self.assertLessEqual(len(self.assess.AssessmentLocation), 250)
        self.assertLessEqual(len(self.assess.AssessmentQuestion), 250) 
        self.assertLessEqual(len(self.assess.AssessmentAnswer), 250)
        self.assertLessEqual(len(self.assess.AssessmentResult), 250)
        self.assertLessEqual(len(self.assess.AssessmentResultType), 250)
        self.assertTrue(self.assess.PrioritizationStatus in [1,2])
        self.assertTrue(self.assess.AssessmentLevel in [1,2])
        self.assertTrue(self.assess.AssessmentType in [1,2,3])
        
        

class CoordinatedEntryEventTest(TestCase):
    def setUp(self):
        self.client = factories.HomelessFactory()
        self.enroll = factories.EnrollmentFactory(PersonalId=self.client)
        self.event = factories.CoordinatedEntryEventFactory(EnrollmentID=self.enroll)  
    
    def test_entryEvent_is_created(self):
        self.assertEqual(self.event.EnrollmentID, self.enroll)
        self.assertTrue(re.match('\d{4}-\d{2}-\d{2}',str(self.event.DateOfEvent)))  
        self.assertTrue(re.match('\d{4}-\d{2}-\d{2}',str(self.event.DateOfResult))) 
        self.assertTrue(self.event.LocationOfHousing in projectCategory)
        self.assertTrue(self.event.Event in list(range(1,16)))
        self.assertTrue(self.event.ClientHousedOrReHoused in ['Yes', 'No'])
        self.assertTrue(self.event.EnrolledInAfterCareProject in ['Yes', 'No'])
        self.assertTrue(self.event.ReferralResult in [1,2,3])


class SexualOrientationTest(TestCase):
    def setUp(self):
        self.client = factories.HomelessFactory()
        self.enroll = factories.EnrollmentFactory(PersonalId=self.client)
        self.sex = factories.SexualOrientationFactory(EnrollmentID=self.enroll)
    
    def test_sexualOrientation_is_created(self):
        self.assertEquals(self.sex.EnrollmentID, self.enroll)
        self.assertTrue(self.sex.SexualOrientation in [1,2,3,4,5,6,8,9,99])


