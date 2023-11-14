from django.urls import path

from .views import RecommendationSend, RecommendationView

app_name = 'recommendation'

urlpatterns = [
    path('', RecommendationSend.as_view(), name='recommendation_send'),
    path('list/', RecommendationView.as_view(), name='recommendation_list'),
]

