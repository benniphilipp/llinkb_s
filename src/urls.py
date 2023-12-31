from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url

from django.conf import settings
from django.conf.urls.static import static

from accounts.views import URLRedirectView

from django.views.i18n import set_language as django_set_language

from products.views import stripe_webhook
from linkinbio.views import LinkInBioDeatilePage
from django.views.i18n import JavaScriptCatalog

urlpatterns = [
    path('admin/', admin.site.urls),
    path('stripe-webhook/', stripe_webhook, name='stripe_webhook'),
    path('m/<int:pk>/', LinkInBioDeatilePage.as_view(), name='detail_page'),
]

urlpatterns += i18n_patterns(
    path('jsi18n/', JavaScriptCatalog.as_view(), name='javascript-catalog'),
    path('shortcode/', include('shortcode.urls')),
    path('analytics/', include('analytics.urls')),
    path('webclicktracker/', include('webclicktracker.urls')),
    path('linkinbio/', include('linkinbio.urls')),
    path('geotargeting/', include('geotargeting.urls')),
    path('products/', include('products.urls')),
    path('i18n/', include('django.conf.urls.i18n')),
    path('domain/', include('domain.urls')),
    path('recommendation/', include('recommendation.urls')),
    path('', include('accounts.urls')),
    url(r'^(?P<shortcode>[\w-]+)/$', URLRedirectView.as_view(), name='scode'), 
)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
