from django.urls import path

from shortcode.views.short_views import (
        ShortcodeListeCreateView,
        ShortcodeSingelUpdateView
    )

app_name = 'shortcode'

urlpatterns = [
    path('create/', ShortcodeListeCreateView.as_view(), name='shortcode_list_view'),
    path('update/<pk>/', ShortcodeSingelUpdateView.as_view(), name='shortcode_single_update_view'),
]