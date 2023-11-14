from django.shortcuts import render
import json
import requests
from django.views import View
from django.http import HttpRequest
from django.http.response import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin

# PW
from django.contrib.auth.hashers import make_password

# import Models
from domain.models import Domain
from shortcode.models import ShortcodeClass

# https://stripe.com/docs/payments/quickstart

class DomainCheckoutView(View):
    template_name = 'domain-checkout.html'
    
    def get(self, request):
        return render(request, self.template_name)
    

class DomainListCrateView(View, LoginRequiredMixin):
    template_name = 'domain-view.html'

    api_endpoint = 'https://api.ote-godaddy.com/v1/domains/available?domain=example.guru'
    api_key = '3mM44UdBKEgt73_NDqvf1eNz5WvnLSxWSd4Ky'
    api_secret = 'YKg1ZA3pfu9TYtxaWXSxt9'
    
    def get(self, request):
        if request.META.get('HTTP_ACCEPT', '') == 'application/json' and request.is_ajax():
            # Führen Sie die API-Anfrage an GoDaddy durch
            
            # api_key = '3mM44UdBKEgt73_NDqvf1eNz5WvnLSxWSd4Ky'
            # api_secret = 'YKg1ZA3pfu9TYtxaWXSxt9'
            
            # # url = 'https://api.ote-godaddy.com/v1/domains/suggest?'
            # url = 'https://api.ote-godaddy.com/v1/domains/suggest?query=benni.com&waitMs=1000'
            # headers = {
            #     'accept': 'application/json',
            #     'X-Shopper-Id': '1',
            #     'Authorization': f'sso-key {api_key}:{api_secret}',
            # }

            # response = requests.get(url, headers=headers)
            # print(response)
            # if response.status_code == 200:
            #     data = response.json()
            #     return JsonResponse(data, safe=False)
            
            # else:
            #     return JsonResponse({'error': 'Fehler bei der API-Anfrage.'}, status=response.status_code)
            
            headers = {
            'Authorization': f'sso-key {self.api_key}:{self.api_secret}'
            }
            response = requests.get(self.api_endpoint, headers=headers)
            print(response.text)
            if response.status_code == 200:
                data = response.json()
                
                return JsonResponse(data, safe=False)

        else:
            # Normale HTML-Anfrage: Seite mit dem Formular rendern
            context = self.get_context(request)
            return render(request, self.template_name, context)
    
    def get_context(self, request):
        # Hier können Sie den Kontext für Ihre HTML-Seite erstellen, wenn Sie sie normal rendern.
        
        pass


class DomainTestView(View):
    
    api_suggest_endpoint = 'https://api.ote-godaddy.com/v1/domains/suggest'
    api_available_endpoint = 'https://api.ote-godaddy.com/v1/domains/available'
    api_key = '3mM44UdBKEgt73_NDqvf1eNz5WvnLSxWSd4Ky'
    api_secret = 'YKg1ZA3pfu9TYtxaWXSxt9'

    def get(self, request):
        
        headers = {
            'Authorization': f'sso-key {self.api_key}:{self.api_secret}',
            'accept': 'application/json',
        }
        
        shortcodes = ShortcodeClass.objects.filter(url_creator=request.user, url_archivate=False)[:5]
        
        search_terms = [shortcode.url_titel for shortcode in shortcodes]
        available_domains = []
        
        for search_term in search_terms:
            # Erste API-Anfrage mit dynamischem Suchbegriff
            response_suggest = requests.get(self.api_suggest_endpoint, headers=headers, params={'query': search_term, 'waitMs': 10})
            if response_suggest.status_code != 200:
                return JsonResponse({'error': 'Fehler bei der API-Anfrage.'}, status=response_suggest.status_code)

            data_suggest = response_suggest.json()

            # Zweite API-Anfrage, um die Verfügbarkeit jeder Domain zu überprüfen
            for domain_data in data_suggest:
                domain_name = domain_data.get('domain')
                response_available = requests.get(self.api_available_endpoint, headers=headers, params={'domain': domain_name, 'checkType': 'FAST', 'forTransfer': False})
                if response_available.status_code != 200:
                    return JsonResponse({'error': 'Fehler bei der zweiten API-Anfrage.'}, status=response_available.status_code)

                data_available = response_available.json()
                if data_available.get('available', False):
                    available_domains.append(domain_data)

            return JsonResponse(available_domains, safe=False)
        else:
            return JsonResponse({'error': 'Fehler beim Abrufen der Domains'}, status=500)
    




# class DomainListView(View):
#     # pass
#     api_endpoint = 'https://api.ote-godaddy.com/v1/domains/available?domain=example.guru'
#     api_key = '3mM44UdBKEgt73_NDqvf1eNz5WvnLSxWSd4Ky'
#     api_secret = 'YKg1ZA3pfu9TYtxaWXSxt9'

#     def get(self, request):
#         headers = {
#             'Authorization': f'sso-key {self.api_key}:{self.api_secret}'
#         }
#         response = requests.get(self.api_endpoint, headers=headers)
#         if response.status_code == 200:
#             data = response.json()
#             # print(data)
#             return JsonResponse(data, safe=False)
#         else:
#             return JsonResponse({'error': 'Fehler beim Abrufen der Domains'}, status=500)
    
    
    
    
    # Versuch
    # raw_password = request.user.password
    # hashed_password = make_password(raw_password)

    # print(f'Passwort: {request.user.password}')


# api@godaddy.com

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