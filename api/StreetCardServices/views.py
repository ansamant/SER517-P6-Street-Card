from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .serializers import UserSerializer, GroupSerializer, SocialWorkerSerializer,HomelessSerializer, UserNameAndIdMappingSerializer
from .models import SocialWorker,Homeless,UserNameAndIdMapping
from rest_framework.views import APIView

class UserViewSet(viewsets.ModelViewSet):
    
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class SocialWorkerRegistration(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class SocialWorkerDetails(viewsets.ModelViewSet):
    queryset = SocialWorker.objects.all()
    serializer_class = SocialWorkerSerializer



class HomelessView(viewsets.ModelViewSet):
    queryset = Homeless.objects.all()
    serializer_class = HomelessSerializer


class UserMapping(viewsets.ModelViewSet):
    queryset = UserNameAndIdMapping.objects.all()
    serializer_class = UserNameAndIdMappingSerializer