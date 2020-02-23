from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import SocialWorker,Homeless,UserNameAndIdMapping


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class SocialWorkerSerializer(ModelSerializer):
    clearanceLevel = serializers.CharField()
    address = serializers.CharField()
    serviceProvider = serializers.CharField()

    class Meta:
        model = SocialWorker
        fields = ('id', 'clearanceLevel', 'address', 'serviceProvider')


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
        UserNameAndIdMapping.objects.create(user_id=user.id,user_name=user.username)
        return user

    def to_representation(self, instance):
        response = super().to_representation(instance)
        print(response)
        response['socialWorker'] = SocialWorkerSerializer(
            SocialWorker.objects.get(user_id=response['id'])).data
        return response

class HomelessSerializer(ModelSerializer):
    
    class Meta:
        model = Homeless
        fields = '__all__'
        

class UserNameAndIdMappingSerializer(ModelSerializer):

    user = UserSerializer(required=False)

    class Meta:
        model = UserNameAndIdMapping
        fields = ('user_name', 'user_id', 'user')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(
            User.objects.get(id=response['user_id'])).data
        return response


