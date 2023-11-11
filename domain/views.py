from django.shortcuts import render
import json
import requests
from django.views import View
from django.http import HttpRequest
from django.http.response import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin

# import Models
from domain.models import Domain

class DomainListCrateView(View, LoginRequiredMixin):
    template_name = 'domain-view.html'

    
    def get(self, request):
        if request.META.get('HTTP_ACCEPT', '') == 'application/json' and request.is_ajax():
            # Führen Sie die API-Anfrage an GoDaddy durch
            
            return JsonResponse()

        else:
            # Normale HTML-Anfrage: Seite mit dem Formular rendern
            context = self.get_context(request)
            return render(request, self.template_name, context)
    
    def get_context(self, request):
        # Hier können Sie den Kontext für Ihre HTML-Seite erstellen, wenn Sie sie normal rendern.
        pass



class DomainListView(View):

    api_endpoint = 'https://api.ote-godaddy.com/v1/domains/available?domain=example.guru'
    api_key = '3mM44UdBKEgt73_NDqvf1eNz5WvnLSxWSd4Ky'
    api_secret = 'YKg1ZA3pfu9TYtxaWXSxt9'

    def get(self, request):
        headers = {
            'Authorization': f'sso-key {self.api_key}:{self.api_secret}'
        }
        response = requests.get(self.api_endpoint, headers=headers)
        if response.status_code == 200:
            data = response.json()
            print(data)
            return JsonResponse(data, safe=False)
        else:
            return JsonResponse({'error': 'Fehler beim Abrufen der Domains'}, status=500)


# api@godaddy.com
'''
Fragen an Godaddy

Kundennummer: 594552852

    Wie bekomme ich eine Liste der Doamins im Test Zurück.
    Kann ich beim APi Test auch eine Domain Kaufen aber nur als test.
    Wie mache ich das bei Doamins als Resaller also welche Adresse gebe ich ein weil die Doamins sollen immer auf den Kunden Regestriert werden.
    Wo kann ich das finden was ich alles angeben muss das es auch auf den User richtig Regestirert ist.
    Kann bei dem User eine Eindeutige ID hinterlegen oder habt ihr eine eindeutege ID für meinen User, 
    ich benötige das um bei dem User alles richtig zu Hinterlegen, ich möchte auch das der User seine daten abrufen kann bei euch dazu benötige ich auch eine Eindeutige ID.
     
'''

    



# Überprüft die Verfügbarkeit von Domains. --> https://www.namecheap.com/support/api/methods/domains/check/
# Gibt eine Liste der Domänen für den jeweiligen Benutzer zurück. --> https://www.namecheap.com/support/api/methods/domains/get-list/
# Legt Kontaktinformationen für die Domäne fest. --> https://www.namecheap.com/support/api/methods/domains/set-contacts/
# Registriert einen neuen Domänennamen. --> https://www.namecheap.com/support/api/methods/domains/create/
# Gibt Informationen über die angeforderte Domäne zurück. --> https://www.namecheap.com/support/api/methods/domains/get-info/
# Legt fest, dass die Domäne benutzerdefinierte DNS-Server verwendet.  --> https://www.namecheap.com/support/api/methods/domains-dns/set-custom/
# Erstellt einen neuen Nameserver. --> https://www.namecheap.com/support/api/methods/domains-ns/create/

# domains.transfer
# https://www.namecheap.com/support/api/methods/domains-transfer/create/
# https://www.namecheap.com/support/api/methods/domains-transfer/get-status/
# https://www.namecheap.com/support/api/methods/domains-transfer/update-status/

# Sripte
# https://github.com/yonjuuni/namecheapapi
# https://github.com/Privex/PyNamecheap