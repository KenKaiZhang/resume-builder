from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.

class Profile(models.Model):
    first = models.CharField(max_length=225, null=True, blank=True)
    middle = models.CharField(max_length=225, null=True, blank=True)
    last = models.CharField(max_length=225, null=True, blank=True)
    address = models.CharField(max_length=225, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    links = models.JSONField(null=True, blank=True)
    objective = models.TextField(null=True, blank=True)

class Education(models.Model):
    school = models.CharField(max_length=225, null=True, blank=True)
    city = models.CharField(max_length=225, null=True, blank=True)
    state = models.CharField(max_length=225, null=True, blank=True)
    country = models.CharField(max_length=225, null=True, blank=True)
    degree = models.CharField(max_length=225, null=True, blank=True)
    major = models.CharField(max_length=225, null=True, blank=True)
    start = models.CharField(max_length=225, null=True, blank=True)
    end = models.CharField(max_length=225, null=True, blank=True)
    graduated = models.BooleanField(null=True, blank=True)
    electives = models.JSONField(null=True, blank=True)
    gpa = models.CharField(max_length=10, null=True, blank=True)

class Experience(models.Model):
    position = models.CharField(max_length=255, null=True, blank=True)
    company = models.CharField(max_length=225, null=True, blank=True)
    city = models.CharField(max_length=225, null=True, blank=True)
    state =models.CharField(max_length=225, null=True, blank=True)
    country = models.CharField(max_length=225, null=True, blank=True)
    start = models.CharField(max_length=225, null=True, blank=True)
    end = models.CharField(max_length=225, null=True, blank=True)
    details = models.JSONField(null=True, blank=True)

class Project(models.Model):
    name = models.CharField(max_length=225, null=True, blank=True)
    tools = models.JSONField(null=True, blank=True)
    details = models.JSONField(null=True, blank=True)

class Skill(models.Model):
    tools = models.JSONField(null=True, blank=True)
    concepts = models.JSONField(null=True, blank=True)
    services = models.JSONField(null=True, blank=True)

class Resume(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, null=True, blank=True)
    educations = models.ManyToManyField(Education,)
    experiences = models.ManyToManyField(Experience)
    projects = models.ManyToManyField(Project)
    skills = models.OneToOneField(Skill, on_delete=models.CASCADE, null=True, blank=True)

    