from django.urls import path

from shortcode.views.archivi_views import (
        ShortcodeAcivieren,
        ArchivListLiftView,
        ShortcodeUnarchived
    )

app_name = 'archive'

urlpatterns = [
    path('', ArchivListLiftView.as_view(), name='achivie_list'),
    path('unarchived/', ShortcodeUnarchived.as_view(), name='shortcode_unarchived'),
    path('achivie/<int:pk>/', ShortcodeAcivieren.as_view(), name='shortcode_achivie'),
]
