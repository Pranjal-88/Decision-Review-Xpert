from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Player,Match,Training

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

from rest_framework import serializers
from .models import Player

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['player_id', 'player_name', 'age', 'team', 'role', 'average', 'photograph']

class MatchSerializer(serializers.ModelSerializer):
    date = serializers.DateField(format='%d-%m-%Y')  

    class Meta:
        model = Match
        fields = ['id', 'team_name', 'format', 'team_logo', 'date', 'time', 'venue']

class TrainingSerializer(serializers.ModelSerializer):
    player = PlayerSerializer()
    date = serializers.DateField(format='%d-%m-%Y') 

    class Meta:
        model = Training
        fields = ['player', 'date', 'time', 'remark']



