from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .utils import check_and_assign

from .models import SocialWorker, IncomeAndSources, NonCashBenefits, Enrollment, DisablingCondition, \
    DomesticViolence, HealthInsurance, W1ServicesProvidedHOPWA, FinancialAssistanceHOPWA, MedicalAssistanceHOPWA, \
    TCellCD4AndViralLoadHOPWA, HousingAssessmentAtExitHOPWA, Homeless, CurrentLivingSituation, DateOfEngagement, \
    BedNightDate, CoordinatedEntryAssessment, CoordinatedEntryEvent, SexualOrientation


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class SocialWorkerSerializer(ModelSerializer):
    class Meta:
        model = SocialWorker
        fields = ('clearanceLevel', 'address', 'serviceProvider')


class UserSerializer(ModelSerializer):
    socialWorker = SocialWorkerSerializer(required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 'socialWorker')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('socialWorker')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        SocialWorker.objects.create(user=user, **profile_data)
        return user


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncomeAndSources
        fields = '__all__'


class NonCashBenefitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NonCashBenefits
        fields = '__all__'


class DisablingConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisablingCondition
        fields = '__all__'


class DomesticViolenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DomesticViolence
        fields = '__all__'


class HealthInsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthInsurance
        fields = '__all__'


class HomelessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homeless
        fields = '__all__'

    # def update(self, instance, validated_data):
    # print("Hello World")
    # instance.FirstName = validated_data.get('FirstName', instance.FirstName)
    # instance.MiddleName = validated_data.get('MiddleName', instance.MiddleName)
    # instance.LastName = validated_data.get('LastName', instance.LastName)
    # instance.NameSuffix = validated_data.get('NameSuffix', instance.NameSuffix)
    # instance.NameDataQuality = validated_data.get('NameDataQuality', instance.NameDataQuality)
    # instance.SSN = validated_data.get('SSN', instance.SSN)
    # instance.SSNDataQuality = validated_data.get('SSNDataQuality', instance.SSNDataQuality)
    # instance.DOB = validated_data.get('DOB', instance.DOB)
    # instance.DOBDataQuality = validated_data.get('DOBDataQuality', instance.DOBDataQuality)
    # instance.Race = validated_data.get('Race', instance.Race)
    # instance.Ethnicity = validated_data.get('Ethnicity', instance.Ethnicity)
    # instance.Gender = validated_data.get('Gender', instance.Gender)
    # instance.VeteranStatus = validated_data.get('VeteranStatus', instance.VeteranStatus)
    # instance.save()
    # return instance


class W1ServicesProvidedHOPWASerializer(serializers.ModelSerializer):
    class Meta:
        model = W1ServicesProvidedHOPWA
        fields = '__all__'


class FinancialAssistanceHOPWASerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialAssistanceHOPWA
        fields = '__all__'


class MedicalAssistanceHOPWASerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalAssistanceHOPWA
        fields = '__all__'


class TCellCD4AndViralLoadHOPWASerializer(serializers.ModelSerializer):
    class Meta:
        model = TCellCD4AndViralLoadHOPWA
        fields = '__all__'


class HousingAssessmentAtExitHOPWASerializer(serializers.ModelSerializer):
    class Meta:
        model = HousingAssessmentAtExitHOPWA
        fields = '__all__'


class CurrentLivingSituationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentLivingSituation
        fields = '__all__'


class DateOfEngagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateOfEngagement
        fields = '__all__'


class BedNightDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BedNightDate
        fields = '__all__'


class CoordinatedEntryAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoordinatedEntryAssessment
        fields = '__all__'


class CoordinatedEntryEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoordinatedEntryEvent
        fields = '__all__'


class SexualOrientationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SexualOrientation
        fields = '__all__'


class EnrollmentSerializer(serializers.ModelSerializer):
    income_and_sources = IncomeSerializer(required=False)
    non_cash_benefits = NonCashBenefitsSerializer(required=False)
    disabling_condition = DisablingConditionSerializer(required=False)
    domestic_violence = DomesticViolenceSerializer(required=False)
    health_insurance = HealthInsuranceSerializer(required=False)
    w1ServicesProvidedHOPWA = W1ServicesProvidedHOPWASerializer(required=False)
    financialAssistanceHOPWA = FinancialAssistanceHOPWASerializer(required=False)
    medicalAssistanceHOPWA = MedicalAssistanceHOPWASerializer(required=False)
    tCellCD4AndViralLoadHOPWA = TCellCD4AndViralLoadHOPWASerializer(required=False)
    housingAssessmentAtExitHOPWA = HousingAssessmentAtExitHOPWASerializer(required=False)
    current_living_situation = CurrentLivingSituationSerializer(required=False)
    date_of_engagement = DateOfEngagementSerializer(required=False)
    bed_night_date = BedNightDateSerializer(required=False)
    coordinated_entry_assessment = CoordinatedEntryAssessmentSerializer(required=False)
    coordinated_entry_event = CoordinatedEntryEventSerializer(required=False)
    sexual_orientation = SexualOrientationSerializer(required=False)

    class Meta:
        model = Enrollment
        fields = ['EnrollmentID', 'DisablingCondition', 'PersonalId', 'ProjectCategory', 'income_and_sources',
                  'non_cash_benefits', 'disabling_condition', 'domestic_violence', 'health_insurance',
                  'w1ServicesProvidedHOPWA', 'financialAssistanceHOPWA', 'medicalAssistanceHOPWA',
                  'tCellCD4AndViralLoadHOPWA', 'housingAssessmentAtExitHOPWA', 'current_living_situation',
                  'date_of_engagement', 'bed_night_date', 'coordinated_entry_assessment', 'coordinated_entry_event',
                  'sexual_orientation']

    def create(self, validated_data):

        income_and_sources_data = check_and_assign('income_and_sources', validated_data)
        non_cash_benefits_data = check_and_assign('non_cash_benefits', validated_data)
        disabling_condition_data = check_and_assign('disabling_condition', validated_data)
        domestic_violence_data = check_and_assign('domestic_violence', validated_data)
        health_insurance_data = check_and_assign('health_insurance', validated_data)
        w1_services_provided_hopwa_data = check_and_assign('w1ServicesProvidedHOPWA', validated_data)
        financial_assistance_hopwa_data = check_and_assign('financialAssistanceHOPWA', validated_data)
        medical_assistance_hopwa_data = check_and_assign('medicalAssistanceHOPWA', validated_data)
        tcellcd4_and_viral_load_hopwa_data = check_and_assign('tCellCD4AndViralLoadHOPWA', validated_data)
        housing_assessment_at_exit_hopwa_data = check_and_assign('housingAssessmentAtExitHOPWA', validated_data)
        current_living_situation_data = check_and_assign('current_living_situation', validated_data)
        date_of_engagement_data = check_and_assign('date_of_engagement', validated_data)
        bed_night_date_data = check_and_assign('bed_night_date', validated_data)
        coordinated_entry_assessment_data = check_and_assign('coordinated_entry_assessment', validated_data)
        coordinated_entry_event_data = check_and_assign('coordinated_entry_event', validated_data)
        sexual_orientation_data = check_and_assign('sexual_orientation', validated_data)

        enroll = Enrollment.objects.create(**validated_data)

        if income_and_sources_data is not None:
            IncomeAndSources.objects.create(EnrollmentID_id=enroll.EnrollmentID, **income_and_sources_data)
        if non_cash_benefits_data is not None:
            NonCashBenefits.objects.create(EnrollmentID_id=enroll.EnrollmentID, **non_cash_benefits_data)
        if disabling_condition_data is not None:
            DisablingCondition.objects.create(EnrollmentID_id=enroll.EnrollmentID, **disabling_condition_data)
        if domestic_violence_data is not None:
            DomesticViolence.objects.create(EnrollmentID_id=enroll.EnrollmentID, **domestic_violence_data)
        if health_insurance_data is not None:
            HealthInsurance.objects.create(EnrollmentID_id=enroll.EnrollmentID, **health_insurance_data)
        if w1_services_provided_hopwa_data is not None:
            W1ServicesProvidedHOPWA.objects.create(EnrollmentID_id=enroll.EnrollmentID,
                                                   **w1_services_provided_hopwa_data)
        if financial_assistance_hopwa_data is not None:
            FinancialAssistanceHOPWA.objects.create(EnrollmentID_id=enroll.EnrollmentID,
                                                    **financial_assistance_hopwa_data)
        if medical_assistance_hopwa_data is not None:
            MedicalAssistanceHOPWA.objects.create(EnrollmentID_id=enroll.EnrollmentID, **medical_assistance_hopwa_data)
        if tcellcd4_and_viral_load_hopwa_data is not None:
            TCellCD4AndViralLoadHOPWA.objects.create(EnrollmentID_id=enroll.EnrollmentID,
                                                     **tcellcd4_and_viral_load_hopwa_data)
        if housing_assessment_at_exit_hopwa_data is not None:
            HousingAssessmentAtExitHOPWA.objects.create(EnrollmentID_id=enroll.EnrollmentID,
                                                        **housing_assessment_at_exit_hopwa_data)
        if current_living_situation_data is not None:
            CurrentLivingSituation.objects.create(EnrollmentID_id=enroll.EnrollmentID, **current_living_situation_data)
        if date_of_engagement_data is not None:
            DateOfEngagement.objects.create(EnrollmentID_id=enroll.EnrollmentID, **date_of_engagement_data)
        if bed_night_date_data is not None:
            BedNightDate.objects.create(EnrollmentID_id=enroll.EnrollmentID, **bed_night_date_data)
        if coordinated_entry_assessment_data is not None:
            CoordinatedEntryAssessment.objects.create(EnrollmentID_id=enroll.EnrollmentID,
                                                      **coordinated_entry_assessment_data)
        if coordinated_entry_event_data is not None:
            CoordinatedEntryEvent.objects.create(EnrollmentID_id=enroll.EnrollmentID, **coordinated_entry_event_data)
        if sexual_orientation_data is not None:
            SexualOrientation.objects.create(EnrollmentID_id=enroll.EnrollmentID, **sexual_orientation_data)

        return enroll

    def update(self, instance, validated_data):

        financial_assistance_hopwa_data = check_and_assign('financialAssistanceHOPWA', validated_data)

        temp = FinancialAssistanceHOPWA.objects.filter(EnrollmentID_id=instance.EnrollmentID)
        for objects in temp:
            print(objects.FinancialAssistanceAmount)
            objects.FinancialAssistanceAmount = financial_assistance_hopwa_data['FinancialAssistanceAmount']
            objects.FinancialAssistanceType = financial_assistance_hopwa_data['FinancialAssistanceType']
            objects.DateOfFinancialAssistance = financial_assistance_hopwa_data['DateOfFinancialAssistance']
            objects.save()
        instance.DisablingCondition = validated_data.get('DisablingCondition', instance.DisablingCondition)
        instance.ProjectCategory = validated_data.get('ProjectCategory', instance.ProjectCategory)
        instance.EntryDate = validated_data.get('EntryDate', instance.EntryDate)
        instance.ExitDate = validated_data.get('ExitDate', instance.ExitDate)
        instance.save()
        return instance

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if IncomeAndSources.objects.filter(EnrollmentID_id=response['EnrollmentID']).exists():
            response['income_and_sources'] = IncomeSerializer(
                IncomeAndSources.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        if NonCashBenefits.objects.filter(EnrollmentID_id=response['EnrollmentID']).exists():
            response['non_cash_benefits'] = NonCashBenefitsSerializer(
                NonCashBenefits.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        if DisablingCondition.objects.filter(EnrollmentID_id=response['EnrollmentID']).exists():
            response['disabling_condition'] = DisablingConditionSerializer(
                DisablingCondition.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        if DomesticViolence.objects.filter(EnrollmentID_id=response['EnrollmentID']).exists():
            response['domestic_violence'] = DomesticViolenceSerializer(
                DomesticViolence.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        if HealthInsurance.objects.filter(EnrollmentID_id=response['EnrollmentID']).exists():
            response['health_insurance'] = HealthInsuranceSerializer(
                HealthInsurance.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        if W1ServicesProvidedHOPWA.objects.filter(EnrollmentID_id=response['EnrollmentID']).exists():
            response['w1_services_provided_hopwa'] = W1ServicesProvidedHOPWASerializer(
                W1ServicesProvidedHOPWA.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        if FinancialAssistanceHOPWA.objects.filter(EnrollmentID_id=response['EnrollmentID']).exists():
            response['financial_assistance_hopwa'] = FinancialAssistanceHOPWASerializer(
                FinancialAssistanceHOPWA.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        if MedicalAssistanceHOPWA.objects.filter(EnrollmentID_id=response['EnrollmentID']).exists():
            response['medical_assistance_hopwa'] = MedicalAssistanceHOPWASerializer(
                MedicalAssistanceHOPWA.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        if TCellCD4AndViralLoadHOPWA.objects.filter(EnrollmentID_id=response['EnrollmentID']).exists():
            response['tcellcd4_and_viral_load_hopwa'] = TCellCD4AndViralLoadHOPWASerializer(
                TCellCD4AndViralLoadHOPWA.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        if HousingAssessmentAtExitHOPWA.objects.filter(EnrollmentID_id=response['EnrollmentID']).exists():
            response['housing_assessment_at_exit_hopwa'] = HousingAssessmentAtExitHOPWASerializer(
                HousingAssessmentAtExitHOPWA.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        if CurrentLivingSituation.objects.filter(EnrollmentID_id=response['EnrollmentID']).exists():
            response['current_living_situation'] = CurrentLivingSituationSerializer(
                CurrentLivingSituation.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        if DateOfEngagement.objects.filter(EnrollmentID_id=response['EnrollmentID']).exists():
            response['date_of_engagement_data'] = DateOfEngagementSerializer(
                DateOfEngagement.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        if BedNightDate.objects.filter(EnrollmentID_id=response['EnrollmentID']).exists():
            response['bed_night_date_data'] = BedNightDateSerializer(
                BedNightDate.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        if CoordinatedEntryAssessment.objects.filter(EnrollmentID_id=response['EnrollmentID']).exists():
            response['coordinated_entry_assessment'] = CoordinatedEntryAssessmentSerializer(
                CoordinatedEntryAssessment.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        if CoordinatedEntryEvent.objects.filter(EnrollmentID_id=response['EnrollmentID']).exists():
            response['coordinated_entry_event'] = CoordinatedEntryEventSerializer(
                CoordinatedEntryEvent.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        if SexualOrientation.objects.filter(EnrollmentID_id=response['EnrollmentID']).exists():
            response['sexual_orientation'] = SexualOrientationSerializer(
                SexualOrientation.objects.get(EnrollmentID_id=response['EnrollmentID'])).data

        return response
