from django.urls import path, include
from .views import DomainListCrateView, DomainListView

app_name = 'domain'
urlpatterns = [
    path('', DomainListCrateView.as_view(), name='doamin_view'),
    path('list/', DomainListView.as_view(), name='domain_list'),
]