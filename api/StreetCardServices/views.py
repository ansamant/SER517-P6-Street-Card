from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .serializers import UserSerializer, GroupSerializer, SocialWorkerSerializer, HomelessSerializer, LogSerializer
from .models import SocialWorker, Homeless, Log


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
    def create(self, request, pk=None):
        queryset= Homeless.objects.all()
        serializer_class = HomelessSerializer

class LogEntry(viewsets.ModelViewSet):
    def create(self, request, pk=None):
        queryset= Log.objects.all()
        serializer_class = LogSerializer