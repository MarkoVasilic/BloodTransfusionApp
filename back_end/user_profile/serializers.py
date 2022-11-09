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

class UserProfileSerializerA(serializers.ModelSerializer):
    class Meta:
      model = UserProfile
      fields = ('address', 'city', 'country', 'phone_number',
       'jmbg', 'gender', 'blood_type', 'profession', 'workplace', 'tranfusion_center', 'loyalty_points')  

class UserProfileSerializer(serializers.ModelSerializer):
    jmbg = serializers.RegexField("^(\d{13})?$", max_length=None, min_length=None, allow_blank=False)
    class Meta:
      model = UserProfile
      fields = ('address', 'city', 'country', 'phone_number',
       'jmbg', 'gender', 'blood_type', 'profession', 'workplace', 'tranfusion_center', "is_activated")       

class UserSerializer(serializers.ModelSerializer):
  userprofile = UserProfileSerializer(read_only = True)
  groups = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
     )
  class Meta:
    model = User
    read_only_fields = ['email']
    fields = ['id', 'email', 'password', 'first_name', 'last_name',
     'userprofile', 'groups']

class UserUpdateSerializer(serializers.ModelSerializer):
    userprofile = UserProfileSerializer()
    class Meta:
        model = User
        read_only_fields = ['email']
        fields = ['id', 'email', 'password', 'first_name', 'last_name',
     'userprofile']

    def update(self, instance, validated_data):
        users_profile_data = validated_data.pop('userprofile')
        print(users_profile_data)
        instance.first_name = validated_data.get('first_name')
        instance.last_name = validated_data.get('last_name')
        users = instance.userprofile
        users.address = users_profile_data.get('address')
        users.city = users_profile_data.get('city')
        users.country = users_profile_data.get('country')
        users.phone_number = users_profile_data.get('phone_number')
        users.jmbg = users_profile_data.get('jmbg')
        users.gender = users_profile_data.get('gender')
        users.blood_type = users_profile_data.get('blood_type')
        users.profession = users_profile_data.get('profession')
        users.workplace = users_profile_data.get('workplace')
        users.tranfusion_center = users_profile_data.get('tranfusion_center')
        instance.save()
        return instance

class UserUpdatePasswordSerializer(serializers.ModelSerializer):
  userprofile = UserProfileSerializer()
  confirm_password = serializers.CharField(write_only=True, required=True)
  class Meta:
    model = User
    fields = ["password","confirm_password", 'userprofile']

  def validate(self, attrs):
    if attrs['password'] != attrs['confirm_password']:
      raise serializers.ValidationError(
        {"password": "Password fields didn't match."})
    return attrs

  def update(self, instance, validated_data):
    users_profile_data = validated_data.pop('userprofile')
    users = instance.userprofile
    instance.set_password(validated_data[("password")])
    users.is_activated = True
    instance.save()
    return instance



class RegisteredUserSerializer(serializers.ModelSerializer):
  userprofile = UserProfileSerializerA()
  groups = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
     )
  class Meta:
    model = User
    read_only_fields = ['email']
    fields = '__all__'

#class RegisteredUserSerializer(serializers.ModelSerializer):
 # userprofile = UserProfileSerializer()
  #groups = serializers.SlugRelatedField(
   #   many=True,
    #  read_only=True,
     # slug_field='name'
    #)
  #class Meta:
   # model = UserProfile
    #fields = '__all__'