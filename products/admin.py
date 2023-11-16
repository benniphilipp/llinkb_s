from django.contrib import admin
from .models import Product, PromoCode, Payment, Subscription, DomainProduct, DomainWishlist, ShoppingCard

admin.site.register(Product)
admin.site.register(PromoCode)
admin.site.register(Payment)
admin.site.register(DomainProduct)
admin.site.register(DomainWishlist)
admin.site.register(ShoppingCard)
