from django.urls import path
from .views import PoseAnalysisView

urlpatterns = [
    path('api/analyze-pose/', PoseAnalysisView.as_view(), name='analyze_pose'),
]