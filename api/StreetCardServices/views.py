from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from .serializers import UserSerializer, GroupSerializer, SocialWorkerSerializer, EnrollmentSerializer, \
    NonCashBenefitsSerializer, IncomeSerializer, HomelessSerializer
from .models import SocialWorker, Homeless, Enrollment, NonCashBenefits, IncomeAndSources

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


class HomelessViewSet(viewsets.ModelViewSet):
    queryset = Homeless.objects.all()
    serializer_class = HomelessSerializer


class EnrollmentViewSet(viewsets.ViewSet):

    @staticmethod
    def list(request, homeless_pk=None):
        queryset = Enrollment.objects.filter(PersonalId_id=homeless_pk)
        serializer = EnrollmentSerializer(queryset, many=True)
        return Response(serializer.data)

    @staticmethod
    def retrieve(request, pk=None, enroll_pk=None):
        queryset = Enrollment.objects.filter(PersonalId_id=pk, EnrollmentID=enroll_pk)
        enroll = Enrollment.objects.get(queryset, PersonalId_id=pk)
        serializer = EnrollmentSerializer(enroll)
        return Response(serializer.data)

    def create(self, request):
        pass

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass
