"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
@author: Shivam/Naren/Aditya/Prashansa/Akash 
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework_nested import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from api.StreetCardServices import views
from api.StreetCardServices.views import SocialWorkerRegistration, SocialWorkerDetails, \
    EnrollmentViewSet, HomelessViewSet, UserViewSet, UserMapping, LogEntry, \
    AppointmentViewSet, ProductViewSet, TransactionViewSet

router = routers.DefaultRouter()
router.register('mapping', UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register('register', SocialWorkerRegistration)
router.register('socialinfo', SocialWorkerDetails)
router.register('product', ProductViewSet, basename='product')
router.register('user', UserMapping)
router.register('homeless', HomelessViewSet, basename='homeless')
enroll_router = routers.NestedSimpleRouter(router, r'homeless', lookup='homeless')
enroll_router.register(r'enrollment', EnrollmentViewSet, basename='enrollment')
enroll_router.register(r'logs', LogEntry, basename='logs')
enroll_router.register(r'appointment', AppointmentViewSet, basename='appointment')
transaction_router = routers.NestedSimpleRouter(router, r'homeless', lookup='homeless')
transaction_router.register(r'transaction', TransactionViewSet, basename='transaction')
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('', include(enroll_router.urls)),
    path('', include(transaction_router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
