import json
import csv
from bs4 import BeautifulSoup
import requests
from django.views import View
from django.shortcuts import render
from django.core.cache import cache
from django.http import HttpRequest
from django.http.response import JsonResponse, HttpResponse
from urllib.parse import unquote
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
                query = request.GET.get('q')
                tags = request.GET.getlist('tags[]') 
                
                page = int(request.GET.get('page', 1))
                per_page = 5  # Anzahl der Einträge pro Seite
                
                start_index = (page - 1) * per_page
                end_index = start_index + per_page
                
                shortcodes = ShortcodeClass.objects.filter(url_creator=request.user, url_archivate=False)
                
                if tags:
                    # Filtern nach Tags, wenn Tags in der Anfrage vorhanden sind
                    shortcodes = shortcodes.filter(tags__name__in=tags)
                    
                if query:
                    # Filtern nach Suchbegriff, wenn ein Suchbegriff in der Anfrage vorhanden ist
                    shortcodes = shortcodes.filter(url_titel__icontains=query)
                    
                result_shortcodes = shortcodes.order_by('-url_create_date')[start_index:end_index]
   
                data = []  
                for shortcode in result_shortcodes:
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
                        'archivate': shortcode.url_archivate,
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
        
        context = {
            'form': form,
            'tags_form': tags_form,
            'admin': request.user.id,
            'useremail': request.user,
        }
        
        return context
    
    
    def post(self, request):
        form = ShortcodeClassForm(request.POST)
        
        if form.is_valid():
            new_destination = form.cleaned_data.get('url_destination')

            form.save()
            cache.delete('json_list_view_cache_key')
            
            if new_destination:
                response = requests.get(new_destination)
                content = response.content
                soup = BeautifulSoup(content, 'html.parser')
                favicon_link = soup.find('link', rel='icon')

                if favicon_link:
                    favicon_url = favicon_link.get('href')
                    if not favicon_url.startswith('http'):
                        # Handle relative URLs
                        base_url = new_destination.split('/')[2]
                        favicon_url = f'http://{base_url}/{favicon_url}'

                    shortcode_instances = ShortcodeClass.objects.filter(url_destination=new_destination)
                    for shortcode_instance in shortcode_instances:
                        shortcode_instance.favicon_path = favicon_url
                        shortcode_instance.save()
                        return JsonResponse({'favicon_url': favicon_url})
                        
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

    
    def post(self, request, pk):

        obj = ShortcodeClass.objects.get(pk=pk)
        if request.is_ajax():
            new_destination = request.POST.get('url_destination')
            new_titel       = request.POST.get('url_titel')
            new_shortcode   = request.POST.get('shortcode_id')
            new_tags        = request.POST.get('tags')
            
            obj.shortcode       = new_shortcode
            obj.url_destination = new_destination
            obj.url_titel       = new_titel
            
            if new_tags:
                tag_ids = [int(tag_id) for tag_id in new_tags.split(',')]
                obj.tags.set(tag_ids)
            
            cache.delete('json_list_view_cache_key')
            obj.save()
            return JsonResponse({'success': _('Your link has been successfully changed')})
        

# Überprüfen der URL-Erreichbarkeit
class CheckingUrlAccessibility(View):
    def get(self, request):
        url = request.GET.get('url', '')
        decoded_url = unquote(url)  
        
        if not decoded_url.startswith('https://'):
            decoded_url = 'https://' + decoded_url
        
        try:
            response = requests.get(decoded_url)
            if response.status_code == 200:
                data = [{'data': 'true'}]
                return JsonResponse(data, safe=False)
        except requests.exceptions.RequestException:
            pass 
    
        data = [{'data': 'false'}]
        return JsonResponse(data, safe=False)
    
    
# Export Shortcode
def export_shortcodes_to_excel(request):
    if request.method == 'POST':
        selected_ids = request.POST.getlist('selected_ids[]')
        selected_shortcodes = [int(id_str.split('_')[-1]) for id_str in selected_ids]

        # Erzeuge die HTTPResponse mit der CSV-Inhalt
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=shortcodes.csv'

        # Erstelle einen CSV-Writer und schreibe die Header-Zeile
        writer = csv.writer(response)
        writer.writerow(['ID', 'URL Titel', 'Aktiviert', 'Shortcode', 'Utm'])

        # Füge ausgewählte Shortcodes-Daten hinzu
        for shortcode_id in selected_shortcodes:
            shortcode = ShortcodeClass.objects.get(pk=shortcode_id)
            row = [shortcode.id, shortcode.url_titel, shortcode.get_short_url, shortcode.url_active, shortcode.get_full_url]
            writer.writerow(row)

        return response

        
        

            
    