from django.urls import path, include
from .views import DomainListCrateView, DomainTestView, DomainCheckoutView

app_name = 'domain'
urlpatterns = [
    path('', DomainListCrateView.as_view(), name='doamin_view'),
    path('list/', DomainTestView.as_view(), name='domain_list'),
    path('checkout/', DomainCheckoutView.as_view(), name='checkout_list'),
]