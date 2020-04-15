from django.contrib import admin
from .models import Enrollment, Homeless, UserNameAndIdMapping

# Register your models here.
admin.site.register(Enrollment)
admin.site.register(Homeless)
admin.site.register(UserNameAndIdMapping)