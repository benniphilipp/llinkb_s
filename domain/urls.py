from django.urls import path, include
from .views import DomainListCrateView, DomainCheckoutView

app_name = 'domain'
urlpatterns = [
    path('', DomainListCrateView.as_view(), name='doamin_view'),
    path('checkout/', DomainCheckoutView.as_view(), name='checkout_list'),
]