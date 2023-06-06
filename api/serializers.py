from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Buddy

class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'confirm_password')

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Password and Confirm Password do not match")
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user
    
    def to_representation(self, instance):
        if self.context['request'].user.is_superuser:
            return super().to_representation(instance)
        
        return {
            'username': instance.username,
        }


class BuddySerializer(serializers.ModelSerializer):
    class Meta:
        model = Buddy
        fields = ('__all__')

    def to_representation(self, instance):
        if self.context['request'].user.is_superuser:
            return super().to_representation(instance)
        
        return {
            'name': instance.name,
            'character_name': instance.character_name
        }
        
