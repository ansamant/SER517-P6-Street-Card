import datetime
import pytz

from django.conf import settings
from django.contrib.auth.models import User, Group
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from uuid import uuid4
from .models import SocialWorker, Homeless, Enrollment, NonCashBenefits, IncomeAndSources, UserNameAndIdMapping, Log, \
    Appointments
from .serializers import UserSerializer, GroupSerializer, SocialWorkerSerializer, EnrollmentSerializer, \
    NonCashBenefitsSerializer, IncomeSerializer, HomelessSerializer, UserNameAndIdMappingSerializer, LogSerializer, \
    AppointmentSerializer
from .tasks import send_email_task, revoke_email_task
from api.celery import app

from .utils import primary_key_generator


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


class HomelessDetails(viewsets.ModelViewSet):
    queryset = Homeless.objects.all()
    serializer_class = HomelessSerializer


class SocialWorkerDetails(viewsets.ModelViewSet):
    queryset = SocialWorker.objects.all()
    serializer_class = SocialWorkerSerializer


class LogEntry(viewsets.ModelViewSet):

    def list(self, request, homeless_pk=None):
        queryset = Log.objects.filter(personalId_id=homeless_pk)
        serializer = LogSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None, homeless_pk=None):
        queryset = Log.objects.filter(pk=pk, personalId_id=homeless_pk, read_only=True)
        enroll = get_object_or_404(queryset, pk=pk)
        serializer = LogSerializer(enroll)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, homeless_pk=None):
        # Test remove later
        # send_email_task.delay("Send Email Test", "Test", settings.EMAIL_HOST_USER, ['recipient@gmail.com'])
        enroll = request.data
        enroll['personalId'] = homeless_pk
        serializer = LogSerializer(data=enroll)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, pk=None, homeless_pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass


class UserMapping(viewsets.ModelViewSet):
    queryset = UserNameAndIdMapping.objects.all()
    serializer_class = UserNameAndIdMappingSerializer


class IncomeDetails(viewsets.ModelViewSet):
    queryset = IncomeAndSources.objects.all()
    serializer_class = IncomeSerializer


class NonCashDetails(viewsets.ModelViewSet):
    queryset = NonCashBenefits.objects.all()
    serializer_class = NonCashBenefitsSerializer


class HomelessViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Homeless.objects.filter()
        serializer = HomelessSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        queryset = Homeless.objects.filter(pk=pk)
        enroll = get_object_or_404(queryset, pk=pk)
        serializer = HomelessSerializer(enroll)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        homeless = request.data
        homeless['PersonalId'] = primary_key_generator()
        serializer = HomelessSerializer(data=homeless)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, pk=None):
        queryset = Homeless.objects.filter(pk=pk)
        enroll = get_object_or_404(queryset, pk=pk)
        serializer = HomelessSerializer(enroll, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, pk=None):
        queryset = Homeless.objects.filter(pk=pk)
        enroll = get_object_or_404(queryset, pk=pk)
        serializer = HomelessSerializer(enroll, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, pk=None):
        pass


class EnrollmentViewSet(viewsets.ViewSet):

    def list(self, request, homeless_pk=None):
        queryset = Enrollment.objects.filter(PersonalId_id=homeless_pk)
        serializer = EnrollmentSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None, homeless_pk=None):
        queryset = Enrollment.objects.filter(pk=pk, PersonalId_id=homeless_pk)
        enroll = get_object_or_404(queryset, pk=pk)
        serializer = EnrollmentSerializer(enroll)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, homeless_pk=None):
        enroll = request.data
        enroll['PersonalId'] = homeless_pk
        enroll['EnrollmentID'] = primary_key_generator()
        serializer = EnrollmentSerializer(data=enroll)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, pk=None, homeless_pk=None):
        queryset = Enrollment.objects.filter(pk=pk, PersonalId_id=homeless_pk)
        enroll = get_object_or_404(queryset, pk=pk)
        serializer = EnrollmentSerializer(enroll, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, pk=None, homeless_pk=None):
        pass

    def destroy(self, request, pk=None):
        pass


class AppointmentViewSet(viewsets.ViewSet):

    def list(self, request, homeless_pk=None):
        queryset = Appointments.objects.filter(personalId_id=homeless_pk).order_by('Date')
        serializer = AppointmentSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None, homeless_pk=None):
        queryset = Appointments.objects.filter(pk=pk, personalId_id=homeless_pk)
        enroll = get_object_or_404(queryset, pk=pk)
        serializer = AppointmentSerializer(enroll)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, homeless_pk=None):

        enroll = request.data
        if (enroll["alert"] == True):
            # generate random id for Celery.
            enroll["AlertTaskID"] = str(uuid4())
            timeFormatted = enroll["Time"].format("%H:%M[:%S]")
            print(timeFormatted)
            message = (
                f"Hello,\n We are writing this message to remind you of an appointment you have scheduled at {enroll['office']}, on {enroll['Date']} at {enroll['Time'].format('hh:mm')}.\n"
                f"Please arrive at {enroll['streetAddress1']}, {enroll['streetAddress2']}, {enroll['city']}, {enroll['state']}, {enroll['zipCode']}.\n"
                f"Please arrive at least 15 minutes early.\n Sincerely,\n StreetCard.")
            receiver = enroll["Email"]
            sender = settings.EMAIL_HOST_USER
            title = "Appointment Reminder from StreetCard"
            us_tz = 'US/'+ enroll["TimeZone"]
            print('USTZ', us_tz)
            az_tz = pytz.timezone(us_tz)
            dateTimeObj = datetime.datetime.strptime(enroll['Date'], '%Y-%m-%d')
            az_dt = az_tz.localize(dateTimeObj)
            etaObj = az_dt.astimezone(pytz.UTC)
            # etaObj = datetime.datetime.strptime(enroll['Date'], '%Y-%m-%d')
            # print("ETA OBJ:", etaObj)
            # send_email_task.apply_async((message, title, sender, [receiver]), eta=etaObj, task_id=enroll["AlertTaskID"])
            send_email_task.apply_async((message, title, sender, [receiver]), eta=datetime.datetime.now() + datetime.timedelta(seconds=10), task_id=enroll["AlertTaskID"])
            revoke_email_task(str(enroll['AlertTaskID']))

        enroll['personalId'] = homeless_pk
        enroll['appointmentId'] = primary_key_generator()
        serializer = AppointmentSerializer(data=enroll)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, pk=None, homeless_pk=None):
        queryset = Appointments.objects.filter(personalId_id=homeless_pk)
        enroll = get_object_or_404(queryset, pk=pk)
        # print("REQ", request.data)
        requestData = request.data
        if(requestData["Email"] !="" and requestData['alert'] == False and requestData["AlertTaskID"] !=""):
            print("ALERT",requestData['AlertTaskID'])
            #app.control.revoke(str(requestData['AlertTaskID']), terminate=True)
            revoke_email_task(str(requestData['AlertTaskID']))
            requestData['AlertTaskID'] = ""

        serializer = AppointmentSerializer(enroll, data=requestData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass
