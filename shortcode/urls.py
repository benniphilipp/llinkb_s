from django.urls import path, include

urlpatterns = [
    path('short/', include('shortcode.views.short_urls')),
]


# from shortcode.views.views_main import (
#     post_crate_view, 
#     load_shortcode_data_view, 
#     GetFaviconView, 
#     post_detaile_data_view, 
#     archive_post, update_post, 
#     ShortcodeArchiveListView, 
#     GetArchivedShortcodesView,
#     export_shortcodes_to_excel,
#     filter_and_search_shortcodes,
#     get_all_tags,
#     CreateTagView,
#     TagDeleteView,
#     TagListView,
#     edit_tag,
#     shortcode_view,
#     DeleteShortcodesView,
#     unarchive_selected_shortcodes)

# from shortcode.views.views_targeting import (
#     toggle_limitation_active_status, 
#     get_limitation_active_status,
#     get_deatile_android_targeting,
#     get_detaile_ios_targeting,
#     get_detaile_geo_targeting,
#     toggle_geo_targeting_active_satus,
#     toggle_android_targeting_active_status,
#     toggle_ios_targeting_active_status,
#     limitationTargetingUpdateView,
#     GeoTargetingUpdateView,
#     AndroidTargetingUpdateView,
#     IosTargetingUpdateView)




# urlpatterns = [
#     path('create/', post_crate_view, name='dashboard-create'),
#     path('update/<pk>/', update_post, name='dashboard-update'),
#     path('update/<pk>/view/', post_detaile_data_view, name='dashboard-update-view'),
#     path('archive/', ShortcodeArchiveListView.as_view(), name='archive-view'),
#     path('delete/', DeleteShortcodesView.as_view(), name='delete_shortcodes'),
#     path('archive/list/', GetArchivedShortcodesView.as_view(), name='archive-list-view'),
#     path('archive/update/', archive_post, name='dashboard-archive'),
#     path('unarchive/', unarchive_selected_shortcodes, name='unarchive_selected_shortcodes'),
#     path('ajax/export-shortcodes/', export_shortcodes_to_excel, name='ajax_export_shortcodes'),
#     path('list/', shortcode_view, name='shortcode_list_view'),
#     path('json-list/', load_shortcode_data_view, name='load_shortcode_data'),
#     path('get_favicon/', GetFaviconView.as_view(), name='get_favicon'),
#     path('serach/', filter_and_search_shortcodes, name='serach'),
#     path('tags/', get_all_tags, name='tags'),
#     path('tags-create/', CreateTagView.as_view(), name='tags-create'),
#     path('tags-list/', TagListView.as_view(), name='tag-list'),
#     path('tags-edit/<int:tag_id>/', edit_tag, name='tag-edit'),
#     path('tags-delete/<int:tag_id>/', TagDeleteView.as_view(), name='tag-delete'),
#     path('toggle_limitation_active_status/<int:pk>/', toggle_limitation_active_status, name='toggle_limitation_active_status'),
#     path('get_limitation_active_status/<int:pk>/', get_limitation_active_status, name='get_limitation_active_status'),
#     path('get_detaile_geo_targeting/<int:pk>/', get_detaile_geo_targeting, name='get_detaile_geo_targeting'),
#     path('get_detaile_ios_targeting/<int:pk>/', get_detaile_ios_targeting, name='get_detaile_ios_targeting'),
#     path('get_deatile_android_targeting/<int:pk>/', get_deatile_android_targeting, name='get_deatile_android_targeting'),
#     path('toggle_geo_targeting_active_satus/<int:pk>/', toggle_geo_targeting_active_satus, name='toggle_geo_targeting_active_satus'),
#     path('toggle_android_targeting_active_status/<int:pk>/', toggle_android_targeting_active_status, name='toggle_android_targeting_active_status'),
#     path('toggle_ios_targeting_active_status/<int:pk>/', toggle_ios_targeting_active_status, name='toggle_ios_targeting_active_status'),
#     path('update_limitation_targeting/<int:pk>/', limitationTargetingUpdateView.as_view(), name='update_geo_targeting'),
#     path('update_geo_targeting/<int:pk>/', GeoTargetingUpdateView.as_view(), name='update_geo_targeting'),
#     path('update_android_targeting/<int:pk>/', AndroidTargetingUpdateView.as_view(), name='update_android_targeting'),
#     path('update_ios_targeting/<int:pk>/', IosTargetingUpdateView.as_view(), name='update_ios_targeting'),
# ]
