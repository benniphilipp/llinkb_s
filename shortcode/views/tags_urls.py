

from django.urls import path

from shortcode.views.tags_views import (
        CreateTagView,
        get_all_tags,
        TagListView,
        edit_tag,
        TagDeleteView,
    )

app_name = 'tags'

urlpatterns = [
    path('', get_all_tags, name='tags_load'),
    path('create/', CreateTagView.as_view(), name='tags_create'),
    path('list/', TagListView.as_view(), name='tag_list'),
    path('edit/<int:tag_id>/', edit_tag, name='tag_edit'),
    path('delete/<int:tag_id>/', TagDeleteView.as_view(), name='tag_delete'),
]
