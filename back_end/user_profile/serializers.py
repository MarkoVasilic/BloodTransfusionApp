from dataclasses import fields
from rest_framework import serializers
from django.contrib.auth.models import User, Group
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

from user_profile.models import UserProfile

class RegisterSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=User.objects.all())]
  )
  password = serializers.CharField(
    write_only=True, required=True, validators=[validate_password])
  confirm_password = serializers.CharField(write_only=True, required=True)
  class Meta:
    model = User
    fields = ('email', 'password', 'confirm_password',
        'first_name', 'last_name')
    extra_kwargs = {
      'first_name': {'required': True},
      'last_name': {'required': True}
    }
  def validate(self, attrs):
    if attrs['password'] != attrs['confirm_password']:
      raise serializers.ValidationError(
        {"password": "Password fields didn't match."})
    return attrs
  def create(self, validated_data):
    user = User.objects.create(
      username=validated_data['email'],
      email=validated_data['email'],
      first_name=validated_data['first_name'],
      last_name=validated_data['last_name']
    )
    user.set_password(validated_data['password'])
    return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
      model = UserProfile
      fields = ('address', 'city', 'country', 'phone_number',
       'jmbg', 'gender', 'profession', 'workplace', 'tranfusion_center')       

class UserSerializer(serializers.ModelSerializer):
  userprofile = UserProfileSerializer()
  groups = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
     )
  class Meta:
    model = User
    fields = ['id', 'email', 'password', 'first_name', 'last_name',
     'userprofile', 'groups']