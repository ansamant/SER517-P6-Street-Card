from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from .serializers import UserSerializer, GroupSerializer, SocialWorkerSerializer, EnrollmentSerializer, \
    IncomeSerializer, NonCashBenefitsSerializer
from .models import SocialWorker, Enrollment, IncomeAndSources, NonCashBenefits, Homeless

from collections import namedtuple

Combined = namedtuple('Combined', ('income', 'noncash'))


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


class IncomeDetails(viewsets.ModelViewSet):
    queryset = IncomeAndSources.objects.all()
    serializer_class = IncomeSerializer


class NonCashDetails(viewsets.ModelViewSet):
    queryset = NonCashBenefits.objects.all()
    serializer_class = NonCashBenefitsSerializer


class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    def create(self, request):
        serializer = EnrollmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
