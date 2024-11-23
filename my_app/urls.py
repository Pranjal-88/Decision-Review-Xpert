from django.urls import path
from .views import SignupView, LoginView,PlayerListView,MatchListView,TrainingSessionView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('signup', SignupView.as_view(), name='signup'),
    path('login', LoginView.as_view(), name='login'),
    path('players',PlayerListView.as_view(),name='player-list'),
    path('matches', MatchListView.as_view(), name='match-list'),
    path('training',TrainingSessionView.as_view(),name='training')
]

urlpatterns=urlpatterns+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

