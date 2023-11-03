from django.urls import path, include
from .views import DomainListCrateView

app_name = 'domain'
urlpatterns = [
    path('', DomainListCrateView.as_view(), name='doamin_view'),
]