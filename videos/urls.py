from django.urls import path
from . import views

urlpatterns = [
    path('api/analyze-pose/', views.analyze_pose, name='analyze_pose'),
    path('api/save-video/', views.save_video, name='save_video'),
]
