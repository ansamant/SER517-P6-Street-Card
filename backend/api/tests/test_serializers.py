# @author: Aditya Samant
# purpose test that Serializer data matches the Model Object for each field

from django.test import TestCase

from api.StreetCardServices import serializers
from . import factories


class TestHomelessSerializer(TestCase):
    def setUp(self):
        self.client = factories.HomelessFactory()
        self.serializer = serializers.HomelessSerializer(self.client)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            """Datetime object needs to be stringified"""
            self.assertEqual(self.serializer.data[field_name], str(getattr(self.client, field_name))) if (
                    field_name == 'DOB') \
                else self.assertEqual(self.serializer.data[field_name], getattr(self.client, field_name))


class TestSocialWorkerSerializer(TestCase):
    def setUp(self):
        self.sw = factories.SocialWorkerFactory()
        self.serializer = serializers.SocialWorkerSerializer(self.sw)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            self.assertEqual(self.serializer.data[field_name], getattr(self.sw, field_name))


class TestProductSerializer(TestCase):
    def setUp(self):
        self.product = factories.ProductFactory()
        self.serializer = serializers.ProductSerializer(self.product)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            self.assertEqual(self.serializer.data[field_name], getattr(self.product, field_name))


# Tests for methods create & to_representation remaining
class TestTransactionSerializer(TestCase):
    def setUp(self):
        self.client = factories.HomelessFactory()
        self.transaction = factories.TransactionFactory(personalId=self.client)
        self.serializer = serializers.TransactionSerializer(self.transaction)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if field_name == 'personalId':
                self.assertEqual(self.serializer.data[field_name], self.client.PersonalId)
            elif 'Amount' in field_name:
                self.assertEqual(float(self.serializer.data[field_name]), float(getattr(self.transaction, field_name)))
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.transaction, field_name))


class TestTransactionDetailsSerializer(TestCase):
    def setUp(self):
        self.product = factories.ProductFactory()
        self.client = factories.HomelessFactory()
        self.transaction = factories.TransactionFactory(personalId=self.client)
        self.td = factories.TransactionDetailFactory(transactionId=self.transaction, productId=self.product)
        self.serializer = serializers.TransactionDetailSerializer(self.td)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'transactionId'):
                self.assertEqual(self.serializer.data[field_name], self.transaction.transactionId)
            elif (field_name == 'productId'):
                self.assertEqual(self.serializer.data[field_name], self.product.productId)
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.td, field_name))


class TestLogSerializer(TestCase):
    def setUp(self):
        self.client = factories.HomelessFactory()
        self.log = factories.LogFactory(personalId=self.client)
        self.serializer = serializers.LogSerializer(self.log)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'personalId'):
                self.assertEqual(self.serializer.data[field_name], self.client.PersonalId)
            elif (field_name == 'datetime'):
                self.assertEqual(self.serializer.data[field_name], str(self.log.datetime))
            else:

                self.assertEqual(self.serializer.data[field_name], getattr(self.log, field_name))


""" Haven't Figured out how to test properly yet
class TestUserNameNIdMappingSerializer(TestCase):
    def setUp(self):
        self.uimap = factories.UserIdMapFactory()
        self.data['user'] = factories.UserFactory()
        self.data['user_name'] = uimap.user_name
        self.data['user_id'] = uimap.user_id
        self.serializer = serializers.UserNameAndIdMappingSerializer(data=self.data)
    
    def test_serializer_fields(self):
        self.assertTrue(self.serializer.is_valid())
        fieldList=['user_name', 'user_id', 'user']
        self.assertTrue(fieldList in list(self.serializer.data.keys()))
        # havent come up with a means of validating the serialized vals yet tbd
"""


class TestIncomeSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.income = factories.IncomeNSourcesFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.IncomeSerializer(self.income)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'InformationDate'):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.income, field_name)))
            elif (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.income, field_name))


class TestNonCashBenefitsSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.ncb = factories.NonCashBenefits(EnrollmentID=self.enroll)
        self.serializer = serializers.NonCashBenefitsSerializer(self.ncb)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'InformationDate'):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.ncb, field_name)))
            elif (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.ncb, field_name))


class TestDisablingConditionSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.disable = factories.DisablingConditionFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.DisablingConditionSerializer(self.disable)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'InformationDate'):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.disable, field_name)))
            elif (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.disable, field_name))


class TestDomesticViolenceSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.domestic = factories.DomesticViolenceFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.DomesticViolenceSerializer(self.domestic)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'InformationDate'):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.domestic, field_name)))
            elif (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.domestic, field_name))


class TestHealthInsuranceSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.hi = factories.InsuranceFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.HealthInsuranceSerializer(self.hi)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'InformationDate'):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.hi, field_name)))
            elif (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.hi, field_name))


class TestAppointmentsSerializer(TestCase):
    def setUp(self):
        self.client = factories.HomelessFactory()
        self.appt = factories.AppointmentsFactory(personalId=self.client)
        self.serializer = serializers.AppointmentSerializer(self.appt)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'Date' or field_name == 'Time'):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.appt, field_name)))
            elif (field_name == 'personalId'):
                self.assertEqual(self.serializer.data[field_name], self.client.PersonalId)
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.appt, field_name))


class TestW1ServicesHOPWASerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.w1 = factories.W1ServicesFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.W1ServicesProvidedHOPWASerializer(self.w1)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'DateOfService'):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.w1, field_name)))
            elif (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.w1, field_name))


class TestFinancialAssistanceSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.fa = factories.FinancialAssistanceFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.FinancialAssistanceHOPWASerializer(self.fa)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'DateOfFinancialAssistance'):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.fa, field_name)))
            elif (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.fa, field_name))


class TestMedicalAssistanceSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.ma = factories.MedicalAssistanceFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.MedicalAssistanceHOPWASerializer(self.ma)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'InformationDate'):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.ma, field_name)))
            elif (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.ma, field_name))


class TestTCellSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.tcell = factories.TCellFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.TCellCD4AndViralLoadHOPWASerializer(self.tcell)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'InformationDate'):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.tcell, field_name)))
            elif (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.tcell, field_name))


class TestHousingAssessmentAtExitSerializer(TestCase):

    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.ha = factories.HousingAssessmentAtExitFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.HousingAssessmentAtExitHOPWASerializer(self.ha)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID) if (
                    field_name == 'EnrollmentID') \
                else self.assertEqual(self.serializer.data[field_name], getattr(self.ha, field_name))


class TestCurrentLivingSituationSerializer(TestCase):

    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.sitch = factories.CurrentLivingStatusFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.CurrentLivingSituationSerializer(self.sitch)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'InformationDate'):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.sitch, field_name)))
            elif (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.sitch, field_name))


class TestDateOfEngagementSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.doe = factories.DateofEngagementFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.DateOfEngagementSerializer(self.doe)

    def test_serializer_fields(self):
        self.assertEqual(self.serializer.data['EnrollmentID'], self.enroll.EnrollmentID)
        self.assertEqual(self.serializer.data['DateOfEngagement'], str(self.doe.DateOfEngagement))


class TestBedNightDateSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.bnd = factories.BedNightDateFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.BedNightDateSerializer(self.bnd)

    def test_serializer_fields(self):
        self.assertEqual(self.serializer.data['BedNightDate'], str(self.bnd.BedNightDate))
        self.assertEqual(self.serializer.data['EnrollmentID'], self.enroll.EnrollmentID)


class TestCoordinatedEntryAssessmentSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.cea = factories.CoordinatedEntryAssessmentFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.CoordinatedEntryAssessmentSerializer(self.cea)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'DateOfAssessment'):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.cea, field_name)))
            elif (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.cea, field_name))


class TestCoordinatedEntryEventSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.cee = factories.CoordinatedEntryEventFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.CoordinatedEntryEventSerializer(self.cee)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'DateOfEvent' or field_name == 'DateOfResult'):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.cee, field_name)))
            elif (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.cee, field_name))


class TestSexualOrientationSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.so = factories.SexualOrientationFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.SexualOrientationSerializer(self.so)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID) if (
                    field_name == 'EnrollmentID') \
                else self.assertEqual(self.serializer.data[field_name], getattr(self.so, field_name))


class TestVeteranInfoSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.vi = factories.VeteranInfoFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.VeteranInformationSerializer(self.vi)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            elif ('Year' in field_name):
                self.assertEqual(self.serializer.data[field_name], int(getattr(self.vi, field_name)))
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.vi, field_name))


class TestServicesProvidedSSVFSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.sp = factories.ServicesProvidedSSVFFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.ServicesProvidedSSVFSerializer(self.sp)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            elif ('DateOfService' == field_name):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.sp, field_name)))
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.sp, field_name))


class TestFinancialAssistanceSSVFSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.fassvf = factories.FinancialAssistanceSSVFFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.FinancialAssistanceSSVFSerializer(self.fassvf)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            elif ('Date' in field_name):
                self.assertEqual(str(self.serializer.data[field_name]), str(getattr(self.fassvf, field_name)))
            elif('Amount in field_name'):
                self.assertEqual(float(self.serializer.data[field_name]), float(getattr(self.fassvf, field_name))) 
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.fassvf, field_name))


class TestPercentAMISerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.ami = factories.PercentAMIFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.PercentOfAMISerializer(self.ami)

    def test_serializer_fields(self):
        self.assertEqual(self.serializer.data['EnrollmentID'], self.enroll.EnrollmentID)
        self.assertEqual(self.serializer.data['HouseholdIncomeAsAPercentageOfAMI'],
                         self.ami.HouseholdIncomeAsAPercentageOfAMI)


class TestLastPermanentAddressSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.addr = factories.LastPermanentAddressFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.LastPermanentAddressSerializer(self.addr)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID) if (
                    field_name == 'EnrollmentID') \
                else self.assertEqual(self.serializer.data[field_name], getattr(self.addr, field_name))


class TestSSVFHPTargetingCriteriaSerializer(TestCase):

    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.ssvf = factories.SSVFHPTargetingCriteriaFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.SSVFHPTargetingCriteriaSerializer(self.ssvf)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID) if (
                    field_name == 'EnrollmentID') \
                else self.assertEqual(self.serializer.data[field_name], getattr(self.ssvf, field_name))


class TestHUDVASHVoucherTrackingSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.vouch = factories.HUDVASHVoucherTrackFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.HUDVASHVoucherTrackingSerializer(self.vouch)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            elif ('Date' in field_name):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.vouch, field_name)))
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.vouch, field_name))


class TestHUDVASHExitInfoSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.exit = factories.HUDVASHExitInformationFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.HUDVASHExitInformationSerializer(self.exit)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID) if (
                    field_name == 'EnrollmentID') \
                else self.assertEqual(self.serializer.data[field_name], getattr(self.exit, field_name))


class TestConnectionWithSOARSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.conn = factories.ConnectionWithSOARFatory(EnrollmentID=self.enroll)
        self.serializer = serializers.ConnectionWithSOARSerializer(self.conn)

    def test_serializer_fields(self):
        self.assertEqual(self.serializer.data['EnrollmentID'], self.enroll.EnrollmentID)
        self.assertEqual(self.serializer.data['ConnectionWithSOAR'], self.conn.ConnectionWithSOAR)


class TestLastGradeCompletedSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.grade = factories.LastGradeCompletedFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.LastGradeCompletedSerializer(self.grade)

    def test_serializer_fields(self):
        self.assertEqual(self.serializer.data['EnrollmentID'], self.enroll.EnrollmentID)
        self.assertEqual(self.serializer.data['LastGradeCompleted'], self.grade.LastGradeCompleted)


class TestEmploymentStatusSerializer(TestCase):
    def setUp(self):
        self.enroll = factories.EnrollmentFactory()
        self.status = factories.EmploymentStatusFactory(EnrollmentID=self.enroll)
        self.serializer = serializers.EmploymentStatusSerializer(self.status)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'EnrollmentID'):
                self.assertEqual(self.serializer.data[field_name], self.enroll.EnrollmentID)
            elif ('InformationDate' == field_name):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.status, field_name)))
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.status, field_name))


class TestEnrollmentSerializer(TestCase):
    def setUp(self):
        self.client = factories.HomelessFactory()
        self.enroll = factories.EnrollmentFactory(PersonalId=self.client)
        self.serializer = serializers.EnrollmentSerializer(self.enroll)

    def test_serializer_fields(self):
        for field_name in self.serializer.data.keys():
            if (field_name == 'PersonalId'):
                self.assertEqual(self.serializer.data[field_name], self.client.PersonalId)
            elif ('Date' in field_name):
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.enroll, field_name)))
            else:
                self.assertEqual(self.serializer.data[field_name], getattr(self.enroll, field_name))
