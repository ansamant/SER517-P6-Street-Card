from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import SocialWorker, Enrollment, IncomeAndSources, NonCashBenefits


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


class EnrollmentSerializer(serializers.ModelSerializer):
    income = IncomeSerializer(required=False)
    non_cash = NonCashBenefitsSerializer(required=False)

    class Meta:
        model = Enrollment
        fields = ['DisablingCondition', 'EnrollmentID', 'PersonalId', 'Project', 'income', 'non_cash']

    def create(self, validated_data):
        income_data = dict(validated_data.pop('income'))
        non_cash_data = validated_data.pop('non_cash')
        enroll = Enrollment.objects.create(**validated_data)
        IncomeAndSources.objects.create(EnrollmentID_id=enroll.EnrollmentID, PersonalId_id=enroll.PersonalId_id,
                                        **income_data)
        NonCashBenefits.objects.create(EnrollmentID_id=enroll.EnrollmentID, PersonalId_id=enroll.PersonalId_id,
                                       **non_cash_data)
        return enroll

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['income'] = IncomeSerializer(
            IncomeAndSources.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        response['non_cash'] = NonCashBenefitsSerializer(
            NonCashBenefits.objects.get(EnrollmentID_id=response['EnrollmentID'])).data
        return response
