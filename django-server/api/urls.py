from django.urls import path
from .views import *

urlpatterns = [
    path("resume/", ResumeView.as_view(), name="resume")
]
