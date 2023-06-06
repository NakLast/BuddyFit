from rest_framework import generics
from .serializers import UserSerializer, BuddySerializer
from rest_framework.permissions import IsAuthenticated
from .models import User, Buddy

class UserCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return User.objects.all()
        else:
            return User.objects.filter(id=user.id)

    def perform_create(self, serializer):
        serializer.save()


class BuddyCreateView(generics.ListCreateAPIView):
    queryset = Buddy.objects.all()
    serializer_class = BuddySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Buddy.objects.all()
        else:
            return Buddy.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    
