import requests
from django.views import View
from django.shortcuts import render
from django.http.response import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils.translation import gettext_lazy as _
from shortcode.models import ShortcodeClass, Tag

#Archivieren & Aufheben
class ShortcodeAcivieren(View, LoginRequiredMixin):
    def get(self, request, pk):
        try:
            shortcode = ShortcodeClass.objects.get(pk=pk)
            print(shortcode)
            if shortcode.url_archivate == False:
                shortcode.url_archivate = True
                shortcode.save()
            else:
                shortcode.url_archivate = False
                shortcode.save()
            return JsonResponse({'success': _('Shortcodes have been successfully archived.')})  
        except ShortcodeClass.DoesNotExist:
            return JsonResponse({'error': _('Your link has been successfully created.')})


# Entarchivieren
class ShortcodeUnarchived(View):
    def post(self, request):
        if request.is_ajax():
            selected_shortcodes = request.POST.getlist('selected_shortcodes[]')
            print(selected_shortcodes)
            for shortcode_id in selected_shortcodes:
                try:
                    shortcode = ShortcodeClass.objects.get(pk=shortcode_id, url_creator=request.user)
                    shortcode.url_archivate = False
                    shortcode.save()
                except ShortcodeClass.DoesNotExist:
                    pass

                response_data = {'message': _('The selected shortcodes have been successfully unarchived.')}
                return JsonResponse(response_data)




# Archive List % Shorcode löschen
class ArchivListLiftView(View):
    def get(self, request):
        template_name = 'archive.html'
        
        if 'application/json' in request.META.get('HTTP_ACCEPT', ''):
            if request.is_ajax():
                archived_shortcodes = ShortcodeClass.objects.filter(url_creator=request.user, url_archivate=True)
                
                shortcode_data = [{
                    'id': shortcode.id, 
                    'url_titel': shortcode.url_titel, 
                    'url_destination':shortcode.url_destination, 
                    'url_create_date':shortcode.url_create_date.strftime('%d %b %Y'),
                    } for shortcode in archived_shortcodes]

                return JsonResponse({'archived_shortcodes': shortcode_data})
        else:
            return render(request, template_name)
        
    def post(self, request):
        if request.is_ajax():
            shortcode_ids = request.POST.getlist('shortcode_ids[]')
            try:
                # Lösche die ausgewählten Shortcodes aus der Datenbank
                ShortcodeClass.objects.filter(pk__in=shortcode_ids).delete()
                message = _('Shortcodes have been successfully deleted.')
            except Exception as e:
                message_trans = _('Error deleting shortcodes: ')
                message = message_trans + str(e)

            return JsonResponse({'message': message})
        else:
            return JsonResponse({'error': 'Ungültige Anfrage'})