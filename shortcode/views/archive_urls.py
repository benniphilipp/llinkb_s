from django.urls import path

from shortcode.views.archivi_views import (
        ShortcodeAcivieren
    )

app_name = 'archive'

urlpatterns = [
    path('achivie/<int:pk>/', ShortcodeAcivieren.as_view(), name='shortcode_achivie'),
    # path('update/<pk>/', ShortcodeSingelUpdateView.as_view(), name='shortcode_single_update_view'),
    # path('checking/', CheckingUrlAccessibility.as_view(), name='checking_url_accessibility'),
    # path('export/', export_shortcodes_to_excel, name='export')
]