# Used to convert the data into readable one by common front end technologies such as JS

from rest_framework import serializers
from .models import *

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class ResumeSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    educations = EducationSerializer(many=True)
    experiences = ExperienceSerializer(many=True)
    projects = ProjectSerializer(many=True)
    skills = SkillSerializer()

    class Meta:
        model = Resume
        fields = '__all__'

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        educations_data = validated_data.pop('educations')
        experiences_data = validated_data.pop('experiences')
        projects_data = validated_data.pop('projects')
        skills_data = validated_data.pop('skills')

        Profile = Profile.objects.create(**profile_data)
        educations = [Education.objects.create(**edu) for edu in educations_data]
        experiences = [Experience.objects.create(**exp) for exp in experiences_data]
        projects = [Project.objects.create(**proj) for proj in projects_data]
        skills = Skill.objects.create(**skills_data)

        resume = Resume.objects.create(
            profile=Profile,
            skills=skills
        )

        resume.educations.set(educations)
        resume.experiences.set(experiences)
        resume.projects.set(projects)

        return resume

