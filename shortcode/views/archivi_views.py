import requests
from django.views import View
from django.http.response import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils.translation import gettext_lazy as _
from shortcode.models import ShortcodeClass, Tag

#Archivieren
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




#Archivierung Aufheben & Archive List

# class ShortcodeArchiveListView(ListView):
#     template_name = "archive.html"
#     model = ShortcodeClass
#     context_object_name = 'current_counters'
    
#     def get_queryset(self):
#         return ShortcodeClass.objects.filter(url_creator=self.request.user, url_archivate=True)


# class GetArchivedShortcodesView(View):
#     def get(self, request):
#         # Holen Sie die archivierten Shortcodes des aktuellen Benutzers
#         archived_shortcodes = ShortcodeClass.objects.filter(url_creator=request.user, url_archivate=True)

#         # Erstellen Sie eine Liste von Shortcode-Daten im JSON-Format
#         shortcode_data = [{'id': shortcode.id, 
#                            'url_titel': shortcode.url_titel, 
#                            'url_destination':shortcode.url_destination, 
#                            'url_create_date':shortcode.url_create_date} for shortcode in archived_shortcodes]

#         return JsonResponse({'archived_shortcodes': shortcode_data})


# @login_required(login_url="/login/")
# def archive_post(request):
#     if request.is_ajax():
#         pk = request.POST.get('pk')
#         print(pk)
#         obj = ShortcodeClass.objects.get(pk=pk)
#         if obj.url_archivate == False:
#             obj.url_archivate = True
#             obj.save()
#         else:
#             obj.url_archivate = False
#             obj.save()
#         return JsonResponse({'count': 'Shortcodes wurden erfolgreich Archiviert.'})  


# def unarchive_selected_shortcodes(request):
#     if request.method == 'POST':
#         # Nehmen Sie die ausgewählten Shortcode-IDs aus dem POST-Daten
#         selected_shortcodes = request.POST.getlist('selected_shortcodes[]')

#         # Überprüfen Sie, ob der Benutzer berechtigt ist, diese Shortcodes zu bearbeiten,
#         # indem Sie sicherstellen, dass die ausgewählten Shortcodes tatsächlich dem aktuellen Benutzer gehören.

#         # Führen Sie die Entarchivierung für die ausgewählten Shortcodes durch
#         for shortcode_id in selected_shortcodes:
#             try:
#                 shortcode = ShortcodeClass.objects.get(pk=shortcode_id, url_creator=request.user)
#                 shortcode.url_archivate = False
#                 shortcode.save()
#             except ShortcodeClass.DoesNotExist:
#                 # Handle den Fall, wenn der Shortcode nicht existiert oder nicht dem Benutzer gehört
#                 pass

#         # Hier können Sie eine Erfolgsmeldung oder eine JSON-Antwort mit Informationen zurückgeben
#         response_data = {'message': 'Die ausgewählten Shortcodes wurden erfolgreich entarchiviert.'}
#         return JsonResponse(response_data)