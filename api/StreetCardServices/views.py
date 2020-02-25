from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions
from .serializers import UserSerializer, GroupSerializer, SocialWorkerSerializer, HomelessSerializer, LogSerializer
from .models import SocialWorker, Homeless, Log
from rest_framework.response import Response

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
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

class HomelessEntry(viewsets.ModelViewSet):
    queryset= Homeless.objects.all()
    serializer_class = HomelessSerializer
    permission_classes = [
        permissions.AllowAny
    ]

class LogEntry(viewsets.ModelViewSet):
    queryset= Log.objects.all()
    serializer_class = LogSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    