import json
from django.views import View
from django.shortcuts import render
from django.core.cache import cache
from django.http import HttpRequest
from django.http.response import JsonResponse, HttpResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils.translation import gettext_lazy as _
from django.core.serializers import serialize

#Import Forms
from shortcode.forms import (
        ShortcodeClassForm, 
        CreateTagForm, 
        LimitationShorcodeForm, 
        GeoTargetingForm, 
        AndroidTargetingForm, 
        IosTargetingForm
        )

# Import Models
from accounts.models import CustomUser
from shortcode.models import ShortcodeClass, Tag
from analytics.models import ClickEvent, DailyClick, IPGeolocation

#Shorctcode Crate
class ShortcodeListeCreateView(View, LoginRequiredMixin):
    template_name = 'shortcode-view.html'
    
    def get(self, request):
        if 'application/json' in request.META.get('HTTP_ACCEPT', ''):
            # JSON-Anfrage: Kontext als JSON zurückgeben
            if request.is_ajax():
                page = int(request.GET.get('page', 1))
                per_page = 5  # Anzahl der Einträge pro Seite
                
                start_index = (page - 1) * per_page
                end_index = start_index + per_page

                shortcodes = ShortcodeClass.objects.filter(url_creator=request.user, url_archivate=False) \
                                                .order_by('-url_create_date')[start_index:end_index]
                
                data = []  
                for shortcode in shortcodes:
                    try:
                        click_event = ClickEvent.objects.get(short_url=shortcode)
                        click_count = click_event.count
                    except ClickEvent.DoesNotExist:
                        click_count = 0
                        
                    tags = [tag.name for tag in shortcode.tags.all()]
                    item = {
                        'short_id': shortcode.pk,
                        'url_titel': shortcode.url_titel,
                        'get_short_url': shortcode.get_short_url,
                        'url_create_date': shortcode.url_create_date.strftime('%d %b %Y'),
                        'click_count': click_count,
                        'url_destination': shortcode.url_destination,
                        'shortcode': shortcode.shortcode,
                        'favicon_path': shortcode.favicon_path,
                        'tags': tags
                    }
                    data.append(item)


                total_shortcodes = ShortcodeClass.objects.filter(url_creator=request.user, url_archivate=False).count()

                return JsonResponse({
                    'data': data,
                    'total_shortcodes': total_shortcodes,
                    'page': page,
                    'per_page': per_page,
                    'start_index': start_index 
                })
        else:
            # Normale HTML-Anfrage: Seite mit dem Formular rendern
            context = self.get_context(request)
            return render(request, self.template_name, context)
    
    def get_context(self, request):
        form = ShortcodeClassForm(request.POST or None, user=request.user)
        tags_form = CreateTagForm()
        limitation_form = LimitationShorcodeForm()
        geo_targeting_form = GeoTargetingForm()
        android_targetingform = AndroidTargetingForm()
        ios_targetingform = IosTargetingForm()
        
        context = {
            'form': form,
            'geo_targeting_form': geo_targeting_form,
            'android_targetingform': android_targetingform,
            'ios_targetingform': ios_targetingform,
            'limitation_form': limitation_form,
            'tags_form': tags_form,
            'admin': request.user.id,
            'useremail': request.user,
        }
        
        return context
    
    
    def post(self, request):
        form = ShortcodeClassForm(request.POST)
        
        if form.is_valid():
            form.save()
            cache.delete('json_list_view_cache_key')
            return JsonResponse({'success': 'Dein Link wurde erfolgreich erstellt.'}, status=200)
        else:
            errors = form.errors
            error_messages = {}
            
            if 'url_destination' in errors:
                error_messages['url_destination'] = errors['url_destination'][0]
            if 'url_titel' in errors:
                error_messages['url_titel'] = errors['url_titel'][0]

            return JsonResponse({'errors': error_messages}, status=200)

        
        
        
        
#Shortcode Update SingleView
class ShortcodeSingelUpdateView(View, LoginRequiredMixin):
    
    def get(self, request, pk):
        try:
            
            shortcode = ShortcodeClass.objects.get(pk=pk)
            tags = [tag.id for tag in shortcode.tags.all()]
            
            short_date = {
                'id': shortcode.pk,
                'url_destination': shortcode.url_destination,
                'url_titel': shortcode.url_titel,
                'url_active': shortcode.url_active,
                'url_archivate': shortcode.url_archivate,
                'shortcode': shortcode.shortcode,
                'tags': tags,
            }
        
            return JsonResponse({'data': short_date})

        except ShortcodeClass.DoesNotExist:
            return JsonResponse({'error': _('No shortcode found')})

    
    def post(self, requuest):
        pass