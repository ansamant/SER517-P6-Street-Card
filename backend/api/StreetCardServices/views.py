import datetime
from uuid import uuid4

import pytz
from django.conf import settings
from django.contrib.auth.models import User, Group
from django.core.cache import cache
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response

from .models import SocialWorker, Homeless, Enrollment, UserNameAndIdMapping, Log, \
    Appointments, Product, Transactions
from .serializers import UserSerializer, GroupSerializer, SocialWorkerSerializer, EnrollmentSerializer, \
    HomelessSerializer, UserNameAndIdMappingSerializer, LogSerializer, \
    AppointmentSerializer, ProductSerializer, TransactionSerializer
from .tasks import send_email_task, revoke_email_task
from .utils import primary_key_generator, is_greeter, is_client, is_caseworker, is_service_provider


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
        if is_caseworker(request.user):
            cache_key = homeless_pk + 'log'
            data = cache.get(cache_key)
            if data is None:
                queryset = Log.objects.filter(personalId_id=homeless_pk).order_by('-datetime')
                serializer = LogSerializer(queryset, many=True)
                if not serializer.data:
                    return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)
                else:
                    return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def retrieve(self, request, pk=None, homeless_pk=None):
        cache_key = homeless_pk + 'log' + pk
        data = cache.get(cache_key)
        if data is None:
            queryset = Log.objects.filter(pk=pk, personalId_id=homeless_pk, read_only=True)
            enroll = get_object_or_404(queryset, pk=pk)
            serializer = LogSerializer(enroll)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(data, status=status.HTTP_200_OK)

    def create(self, request, homeless_pk=None):
        if is_greeter(request.user):
            cache_key = homeless_pk + 'log'
            enroll = request.data
            enroll['personalId'] = homeless_pk
            serializer = LogSerializer(data=enroll)
            if serializer.is_valid():
                cache.delete(cache_key)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def update(self, request, pk=None, homeless_pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass


class UserMapping(viewsets.ModelViewSet):
    queryset = UserNameAndIdMapping.objects.all()
    serializer_class = UserNameAndIdMappingSerializer


class HomelessViewSet(viewsets.ViewSet):

    def list(self, request):
        if is_greeter(request.user) or is_caseworker(request.user):
            cache_key = 'homeless'
            data = cache.get(cache_key)
            if data is None:
                queryset = Homeless.objects.filter()
                serializer = HomelessSerializer(queryset, many=True)
                cache.set(cache_key, serializer.data, settings.CACHE_TIME)
                if serializer.data == []:
                    return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)
                else:
                    return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def retrieve(self, request, pk=None):
        if is_greeter(request.user) or is_client(request.user) or is_caseworker(request.user):
            cache_key = 'homeless' + pk
            data = cache.get(cache_key)
            if data is None:
                queryset = Homeless.objects.filter(pk=pk)
                homeless = get_object_or_404(queryset, pk=pk)
                serializer = HomelessSerializer(homeless)
                cache.set(cache_key, serializer.data, settings.CACHE_TIME)
                if serializer.data == []:
                    return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)
                else:
                    return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def create(self, request):
        if is_caseworker(request.user):
            cache_key1 = 'homeless'
            homeless = request.data
            homeless['PersonalId'] = primary_key_generator()
            serializer = HomelessSerializer(data=homeless)
            if serializer.is_valid():
                cache.delete(cache_key1)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def update(self, request, pk=None):
        if is_caseworker(request.user):
            cache_key1 = 'homeless' + pk
            cache_key2 = 'homeless'
            queryset = Homeless.objects.filter(pk=pk)
            enroll = get_object_or_404(queryset, pk=pk)
            serializer = HomelessSerializer(enroll, data=request.data)
            if serializer.is_valid():
                cache.delete(cache_key1)
                cache.delete(cache_key2)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, pk=None):
        if is_caseworker(request.user):
            cache_key = 'homeless' + pk
            queryset = Homeless.objects.filter(pk=pk)
            enroll = get_object_or_404(queryset, pk=pk)
            serializer = HomelessSerializer(enroll, data=request.data, partial=True)
            if serializer.is_valid():
                cache.delete(cache_key)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, pk=None):
        pass


class EnrollmentViewSet(viewsets.ViewSet):

    def list(self, request, homeless_pk=None):
        if is_caseworker(request.user):
            cache_key = homeless_pk + 'enrollment'
            data = cache.get(cache_key)
            if data is None:
                queryset = Enrollment.objects.filter(PersonalId_id=homeless_pk)
                serializer = EnrollmentSerializer(queryset, many=True)
                cache.set(cache_key, serializer.data, settings.CACHE_TIME)
                if serializer.data == []:
                    return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)
                else:
                    return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def retrieve(self, request, pk=None, homeless_pk=None):
        if is_caseworker(request.user):
            cache_key = homeless_pk + 'enrollment' + pk
            data = cache.get(cache_key)
            if data is None:
                queryset = Enrollment.objects.filter(pk=pk, PersonalId_id=homeless_pk)
                enroll = get_object_or_404(queryset, pk=pk)
                serializer = EnrollmentSerializer(enroll)
                cache.set(cache_key, serializer.data, settings.CACHE_TIME)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def create(self, request, homeless_pk=None):
        if is_caseworker(request.user):
            cache_key = homeless_pk + 'enrollment'
            enroll = request.data
            enroll['PersonalId'] = homeless_pk
            enroll['EnrollmentID'] = primary_key_generator()
            serializer = EnrollmentSerializer(data=enroll)
            if serializer.is_valid():
                cache.delete(cache_key)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def update(self, request, pk=None, homeless_pk=None):
        if is_caseworker(request.user):
            cache_key1 = homeless_pk + 'enrollment'
            cache_key2 = homeless_pk + 'enrollment' + pk
            queryset = Enrollment.objects.filter(pk=pk, PersonalId_id=homeless_pk)
            enroll = get_object_or_404(queryset, pk=pk)
            serializer = EnrollmentSerializer(enroll, data=request.data)
            if serializer.is_valid():
                cache.delete(cache_key1)
                cache.delete(cache_key2)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, pk=None, homeless_pk=None):
        pass

    def destroy(self, request, pk=None):
        pass


class AppointmentViewSet(viewsets.ViewSet):

    def list(self, request, homeless_pk=None):
        if is_caseworker(request.user) or is_client(request.user):
            cache_key = homeless_pk + 'appointment'
            data = cache.get(cache_key)
            if data is None:
                queryset = Appointments.objects.filter(personalId_id=homeless_pk).order_by('-Date')
                serializer = AppointmentSerializer(queryset, many=True)
                cache.set(cache_key, serializer.data, settings.CACHE_TIME)
                if serializer.data == []:
                    return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)
                else:
                    return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def retrieve(self, request, pk=None, homeless_pk=None):
        if is_client(request.user) or is_caseworker(request.user):
            cache_key = homeless_pk + 'appointment' + pk
            data = cache.get(cache_key)
            if data is None:
                queryset = Appointments.objects.filter(pk=pk, personalId_id=homeless_pk)
                enroll = get_object_or_404(queryset, pk=pk)
                serializer = AppointmentSerializer(enroll)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def create(self, request, homeless_pk=None):
        if is_caseworker(request.user):
            enroll = request.data
            if enroll["alert"]:
                # generate random id for Celery.
                enroll["AlertTaskID"] = str(uuid4())
                time_formatted = str(enroll["Time"])[:5]
                strAddr1 = "" if (enroll.get('streetAddress1') is None) else enroll['streetAddress1']
                strAddr2 = "" if (enroll.get('streetAddress2') is None) else enroll['streetAddress2']

                message = (
                    f"Hello,\n We are writing this message to remind you of an appointment you have scheduled at {enroll['office']}, on {enroll['Date']} at {time_formatted}.\n"
                    f"Please arrive at {strAddr1}, {strAddr2}, {enroll['city']}, {enroll['state']}, {enroll['zipCode']}.\n"
                    f"Please arrive at least 15 minutes early.\n Sincerely,\n StreetCard.")

                receiver = enroll["Email"]
                sender = settings.EMAIL_HOST_USER
                title = "Appointment Reminder from StreetCard"
                us_tz = 'US/' + enroll["TimeZone"]
                az_tz = pytz.timezone(us_tz)
                dateTimeObj = datetime.datetime.strptime(enroll['Date'], '%Y-%m-%d')
                az_dt = az_tz.localize(dateTimeObj)
                etaObj = az_dt.astimezone(pytz.UTC)
                send_email_task.apply_async((message, title, sender, [receiver]), eta=etaObj,
                                            task_id=enroll["AlertTaskID"],
                                            time_limit=10, soft_time_limit=5)
            enroll['personalId'] = homeless_pk
            enroll['appointmentId'] = primary_key_generator()
            serializer = AppointmentSerializer(data=enroll)
            cache_key = homeless_pk + 'appointment'
            if serializer.is_valid():
                cache.delete(cache_key)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def update(self, request, pk=None, homeless_pk=None):
        if is_caseworker(request.user):
            cache_key1 = homeless_pk + 'appointment'
            cache_key2 = homeless_pk + 'appointment' + pk
            queryset = Appointments.objects.filter(personalId_id=homeless_pk)
            enroll = get_object_or_404(queryset, pk=pk)
            requestData = request.data
            if requestData['Email'] != "" and requestData['alert'] == True:
                requestData['AlertTaskID'] = str(uuid4())

                strAddr1 = "" if (requestData.get('streetAddress1') is None) else requestData['streetAddress1']
                strAddr2 = "" if (requestData.get('streetAddress2') is None) else requestData['streetAddress2']
                message = (
                    f"Hello,\n We are writing this message to remind you of an appointment you have scheduled at {requestData['office']}, on {requestData['Date']} at {requestData['Time'].format('hh:mm')}.\n"
                    f"Please arrive at {strAddr1}, {strAddr2}, {requestData['city']}, {requestData['state']}, {requestData['zipCode']}.\n"
                    f"Please arrive at least 15 minutes early.\n Sincerely,\n StreetCard.")
                receiver = requestData['Email']
                sender = settings.EMAIL_HOST_USER
                title = "Appointment Reminder from StreetCard"
                us_tz = 'US/' + requestData["TimeZone"]
                az_tz = pytz.timezone(us_tz)
                dateTimeObj = datetime.datetime.strptime(requestData['Date'], '%Y-%m-%d')
                az_dt = az_tz.localize(dateTimeObj)
                etaObj = az_dt.astimezone(pytz.UTC)
                send_email_task.apply_async((message, title, sender, [receiver]), eta=etaObj,
                                            task_id=requestData["AlertTaskID"], time_limit=90, soft_time_limit=60)

            elif requestData['Email'] != "" and requestData['alert'] == False and requestData["AlertTaskID"] != "":
                revoke_email_task(str(requestData['AlertTaskID']))
                requestData['AlertTaskID'] = ""

            serializer = AppointmentSerializer(enroll, data=requestData)
            if serializer.is_valid():
                cache.delete(cache_key1)
                cache.delete(cache_key2)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass


class ProductViewSet(viewsets.ViewSet):

    def list(self, request):
        if is_greeter(request.user) or is_service_provider(request.user):
            queryset = Product.objects.all()
            serializer = ProductSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(data=None, status=status.HTTP_403_FORBIDDEN)

    def retrieve(self, request, pk=None):
        if is_greeter(request.user) or is_service_provider(request.user):
            queryset = Product.objects.filter(pk=pk)
            product = get_object_or_404(queryset, pk=pk)
            serializer = ProductSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(data=None, status=status.HTTP_403_FORBIDDEN)

    def create(self, request):
        if is_service_provider(request.user):
            product = request.data
            product['productId'] = primary_key_generator()
            serializer = ProductSerializer(data=product)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def update(self, request, pk=None):
        if is_service_provider(request.user) or is_greeter(request.user):
            queryset = Product.objects.filter(pk=pk)
            enroll = get_object_or_404(queryset, pk=pk)
            serializer = ProductSerializer(enroll, data=request.data)
            if serializer.is_valid() and is_greeter(request.user):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, pk=None, homeless_pk=None):
        pass

    def destroy(self, request, pk=None):
        pass


class TransactionViewSet(viewsets.ViewSet):

    def list(self, request, homeless_pk=None):
        if is_service_provider(request.user):
            queryset = Transactions.objects.filter(personalId_id=homeless_pk)
            serializer = TransactionSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(data=None, status=status.HTTP_403_FORBIDDEN)

    def retrieve(self, request, pk=None, homeless_pk=None):
        if is_service_provider(request.user):
            queryset = Transactions.objects.filter(pk=pk, personalId_id=homeless_pk)
            transaction = get_object_or_404(queryset, pk=pk)
            serializer = TransactionSerializer(transaction)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def create(self, request, homeless_pk=None):
        if is_greeter(request.user):
            transaction = request.data
            transaction['personalId'] = homeless_pk
            transaction['transactionId'] = primary_key_generator()
            serializer = TransactionSerializer(data=transaction)
            if serializer.is_valid() and is_greeter(request.user):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def update(self, request, pk=None, homeless_pk=None):
        pass

    def partial_update(self, request, pk=None, homeless_pk=None):
        pass

    def destroy(self, request, pk=None):
        pass
