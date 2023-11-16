from django.urls import path, include
from .views import (
            DomainListCrateView, 
            DomainCheckoutView, 
            SearchDomainView,
            AddWishlistView,
            CrateSubaccountAndShoppingCard,
            DomainSuccess
        )

app_name = 'domain'
urlpatterns = [
    path('', DomainListCrateView.as_view(), name='doamin_view'),
    path('serach/', SearchDomainView.as_view(), name='doamin_search'),
    path('add-wishlist/', AddWishlistView.as_view(), name='add_wishlist'),
    path('check-user/', CrateSubaccountAndShoppingCard.as_view(), name='check_user'),
    path('checkout/', DomainCheckoutView.as_view(), name='checkout_list'),
    path('success/', DomainSuccess.as_view(), name='checkout_success'),
]