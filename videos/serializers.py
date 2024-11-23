from rest_framework import serializers
from .models import TrainingVideo

class TrainingVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingVideo
        fields = '__all__'
        