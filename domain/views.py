from django.shortcuts import render
import json
from django.views import View
from django.http import HttpRequest
from django.http.response import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin

# import Models
from domain.models import Domain

class DomainListCrateView(View, LoginRequiredMixin):
    template_name = 'domain-view.html'
    
    def get(self, request):
        if 'application/json' in request.META.get('HTTP_ACCEPT', ''):
            if request.is_ajax():
                return JsonResponse({})
        else:
            # Normale HTML-Anfrage: Seite mit dem Formular rendern
            context = self.get_context(request)
            return render(request, self.template_name, context)
    
    def get_context(self, request):
        pass
    



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