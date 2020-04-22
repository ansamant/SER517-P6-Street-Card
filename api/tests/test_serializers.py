#@author: Aditya Samant
# purpose test that Serializer data matches the Model Object for each field

from django.test import TestCase

from api.StreetCardServices import serializers
from . import factories

class TestHomelessSerializer(TestCase):
    def setUp(self):
        self.client = factories.HomelessFactory()
        self.serializer = serializers.HomelessSerializer(self.client)

    def test_model_fields(self):
        fieldList=  [
            'PersonalId', 'FirstName', 'MiddleName', 'LastName', "NameSuffix", 'NameDataQuality', 'SSN', 'SSNDataQuality', 'DOB', 'DOBDataQuality',
            'Race', 'Ethnicity', 'Gender', 'VeteranStatus', 'Email', 'PhoneNumber', 'PhoneNumberPrefix']
        
        for field_name in fieldList:
            if(field_name == 'DOB'):
                """Datetime object needs to be stringified"""
                self.assertEqual(self.serializer.data[field_name], str(getattr(self.client, field_name)))
            else:
               
                self.assertEqual(self.serializer.data[field_name], getattr(self.client, field_name))