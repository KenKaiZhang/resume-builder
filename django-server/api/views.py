from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions,status
from rest_framework_simplejwt.tokens import AccessToken
from authentication.models import User
from .models import *
from .serializers import *

# Create your views here.
class ResumeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):

        auth_header = request.headers.get("Authorization")
        if not (auth_header and auth_header.startswith('Bearer ')):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        token = auth_header.split(' ')[1]
        user_id = AccessToken(token)['user_id']

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        print(user)
        # resume = request.data
        # serializer = ResumeSerializer(resume)
        # if serializer.is_valid():
        #     serializer.save()
        #     user.resume = serializer.data.id
        #     user.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    
