
import json
import requests
from decimal import Decimal
from urllib.parse import unquote
from datetime import timedelta, date, datetime

from django.db.models import Sum, F, FloatField, ExpressionWrapper
from django.urls import reverse
from django.shortcuts import render
from django.views import View
from django.http import HttpRequest, HttpResponseRedirect
from django.http.response import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.hashers import check_password

# Product
from products.models import DomainProduct, DomainWishlist, ShoppingCard

# Accounts
from accounts.models import CustomUser

# Stripe
import stripe
from django.conf import settings

STRIPE_SECRET_KEY = settings.STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY = settings.STRIPE_PUBLISHABLE_KEY
stripe.api_key = STRIPE_SECRET_KEY


# Domain 
GODADDY_API_KEY = settings.GODADDY_API_KEY
GODADDY_API_SECRET = settings.GODADDY_API_SECRET
GODADDY_URL = settings.GODADDY_URL


# import Models
from domain.models import Domain
from shortcode.models import ShortcodeClass


# Crate Subaccount und ShoppingCard
class CrateSubaccountAndShoppingCard(View):
    
    def get(self, request):
        try:
            id = request.user.id
            user = CustomUser.objects.get(pk=id)

            data = [{
                'email': user.email,
                'address': user.address,
                'zip_code': user.zip_code,
                'city': user.city,
                'first_name': user.first_name,
                'last_name': user.last_name
            }]
            
            return JsonResponse(data, safe=False)
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=403)
    
    def post(seld, request):
        try:
            email = request.POST.get('email', '')
            address = request.POST.get('address', '')
            zip_code = request.POST.get('zip_code', '')
            city = request.POST.get('city', '')
            firstname = request.POST.get('firstname', '')
            lastname = request.POST.get('lastname', '')
            passwort = request.POST.get('passwort', '')
            wishlistId = request.POST.get('wishlistId', '')
            
            user_id = request.user.id
            
            
            is_password_correct = check_password(passwort, request.user.password)

            if is_password_correct:
                print('Passwort ist richtig')
                
                # User Daten Speichern
                user = CustomUser.objects.get(pk=user_id)

                user.email = email
                user.address = address
                user.zip_code = zip_code
                user.city = city
                user.first_name = firstname
                user.last_name = lastname
                user.save()
                
                # Hier wird ein Account für GoDaddy angelegt
                api_endpoint = 'https://api.ote-godaddy.com/v1/shoppers/subaccount'
                headers = {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': f'sso-key {GODADDY_API_KEY}:{GODADDY_API_SECRET}'
                }
                
                data = {
                    "email": email,
                    "externalId": 594552852,
                    "marketId": "en-US",
                    "nameFirst": lastname,
                    "nameLast": firstname,
                    "password": passwort
                }
                
                response = requests.post(api_endpoint, headers=headers, json=data)
                
                # Überprüfe die Antwort
                if response.status_code == 200:
                    print("Erfolgreich!")
                    print(response.json())
                else:
                    print("Fehler beim Anfordern:", response.status_code)
                    print(response.text)
                    
                # Hier wird weitergeleitet zur Checkout page und ein Warenkorb erstellt
                user_shopping_cart = ShoppingCard.objects.filter(user=request.user).first()
                
                if not user_shopping_cart:
                    wishlist = DomainWishlist.objects.get(pk=wishlistId)
                    ShoppingCard.objects.create(card=wishlist)
                    #print("Neuer Warenkorb erstellt und Produkt hinzugefügt.")
                    
                else:
                    print("Es existiert bereits ein Warenkorb für den Benutzer.")
                
                return JsonResponse({'redirect': reverse('domain:checkout_list')})

            else:
                return JsonResponse({'message': False})
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=403)


# Search Domain
class SearchDomainView(View):
    def post(self, request):
        search = request.POST.get('url', '')
        lts = request.POST.get('lts', '')
        
        if search and lts:
            
            available_domains = []
            api_available_endpoint = 'https://api.ote-godaddy.com/v1/domains/available'
            api_endpoint = f'{GODADDY_URL}/v1/domains/available?domain={search}.{lts}&checkType=FAST&forTransfer=false'
            suggest_api_endpoint = 'https://api.ote-godaddy.com/v1/domains/suggest'
            
            headers = {
                'Authorization': f'sso-key {GODADDY_API_KEY}:{GODADDY_API_SECRET}'
            }
            
            #Führe die API-Anfrage durch
            response_available = requests.get(api_endpoint, headers=headers)
            if response_available.status_code == 200:
                data_available = response_available.json()

                response_suggest = requests.get(suggest_api_endpoint, headers=headers, params={'query': search, 'waitMs': 10})
                if response_suggest.status_code == 200:
                    data_suggest = response_suggest.json()
                    
                    for domain_data in data_suggest[:10]:
                        domain_name = domain_data.get('domain')
                        suggest_available = requests.get(api_available_endpoint, headers=headers, params={'domain': domain_name, 'checkType': 'FAST', 'forTransfer': False})
                        if suggest_available.status_code != 200:
                            return JsonResponse({'error': 'Fehler bei der zweiten API-Anfrage.'}, status=response_available.status_code)
                        
                        suggest_data = suggest_available.json()

                        if suggest_data.get('available', False):
                            # Extrahiere den Preis aus der API-Antwort und füge ihn zum Domain-Datenmodell hinzu
                            domain_price = suggest_data.get('price', 'N/A')
                            domain_period = suggest_data.get('period', 'N/A')
                            domain_data['price'] = domain_price
                            domain_data['period'] = domain_period
                            
                            available_domains.append(domain_data)

                
                    data = {
                        'data_available': data_available,
                        'available_domains': available_domains
                    }
                    
                return JsonResponse(data, safe=False)
            else:
                return JsonResponse({'error': 'Fehler beim Abrufen der Domains'}, status=500)
            
        else:
            # Falls search oder lts fehlen, gib die unterstützten TLDs zurück
            api_endpoint = f'{GODADDY_URL}/v1/domains/tlds'
            headers = {
                'Authorization': f'sso-key {GODADDY_API_KEY}:{GODADDY_API_SECRET}'
            }
            response = requests.get(api_endpoint, headers=headers)

            if response.status_code == 200:
                data = response.json()
                return JsonResponse(data, safe=False)
            else:
                return JsonResponse({'error': 'Fehler beim Abrufen der unterstützten TLDs'}, status=500)


# Add Shopping Card
class AddWishlistView(View):
    
    def delete(self, request):
        id = request.GET.get('id', '')
        try:
            obj = DomainProduct.objects.get(pk=id)
            obj.delete()
            
            return JsonResponse({'message': _('Remove product from wish list')})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    def get(self,request):
        try:
            wishlists = DomainWishlist.objects.filter(user=request.user)
            
            data = []

            for wishlist in wishlists:
                for product in wishlist.products.all():
                    data.append({
                        'wishlist_id': wishlist.pk,
                        'id': product.id, 
                        'product': product.domain,
                        'price': product.price,
                        'date': datetime.today().strftime('%b %Y'),
                    })

            return JsonResponse(data, safe=False)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    def post(self, request):
        
        try:
            price = request.POST.get('price', '')
            domain = request.POST.get('domain', '')
            user = request.user
            
            wishlist, created = DomainWishlist.objects.get_or_create(user=user)

            # Versuche, das Produkt zu finden
            product, created = DomainProduct.objects.get_or_create(
                domain=domain, 
                user=user,
                price=price
            )

            # Überprüfe, ob das Produkt in der Wunschliste ist
            if product not in wishlist.products.all():
                # Füge das Produkt zur Wunschliste hinzu
                wishlist.products.add(product)
            
            return JsonResponse({'success': _('Domain was added to wishlist')})
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
            


# https://stripe.com/docs/payments/quickstart
def calculate_order_amount(items):
    try:
        shopping_id = items[0]['id']
        
        user_shopping_cart = ShoppingCard.objects.filter(pk=shopping_id).first()
        
        if user_shopping_cart:
            # Annahme: DomainProduct hat ein Feld 'price'
            total_price = user_shopping_cart.card.products.aggregate(total_price=Sum('price')).get('total_price') or 0
            
            # Hier kannst du die Steuer oder andere Berechnungen hinzufügen
            tax_rate = Decimal('0.20')
            tax_amount = total_price * tax_rate
            
            total_price_in_cents = int(tax_amount)
            total_price_in_cents = max(1, min(total_price_in_cents, 999999))

            return total_price_in_cents
     
        else:
            print('Shopping Cart nicht gefunden.')
            
    except Exception as e:
        print(f'Fehler beim Berechnen des Bestellbetrags: {str(e)}')
    return 0

# Domain Pay Chackout
class DomainCheckoutView(View):
    template_name = 'domain-checkout.html'
    
    def post(self, request):
        try:
            data = json.loads(request.body)
            # Erstelle eine PaymentIntent mit dem Bestellbetrag und der Währung
            intent = stripe.PaymentIntent.create(
                amount = calculate_order_amount(data['items']),
                currency='eur',
                automatic_payment_methods={
                    'enabled': True,
                },
            )
            
            intent = stripe.PaymentIntent.modify(
                intent.id,
                metadata={
                    'product_cat': 'domain',
                }
            )
            
            context = {'clientSecret': intent.client_secret}
            return JsonResponse(context)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=403)

    
    def get(self, request):
        if 'application/json' in request.META.get('HTTP_ACCEPT', ''):
            if request.is_ajax():
                shopping_carts = ShoppingCard.objects.filter(user=request.user)
                shopping_id = shopping_carts.first().id if shopping_carts.exists() else None
                
                data = shopping_carts.values(
                    'card__products__id',
                    'card__products__domain',
                    'card__products__price',
                ).annotate(
                    date=F('card__datum')
                )
                
                for entry in data:
                    entry['date'] = datetime.today().strftime('%b %Y')
                    
                total_price = shopping_carts.aggregate(
                    total_price=ExpressionWrapper(Sum('card__products__price'), output_field=FloatField())
                )['total_price'] or 0
                tax_price = total_price * 0.2
                
                user = CustomUser.objects.get(pk=request.user.id)
                email = user.email
                
                success = reverse('domain:checkout_success')
                success_url = request.build_absolute_uri(success)
                
                
            return JsonResponse({'data': list(data), 'total_price': total_price, 'tax_price': tax_price, 'shopping_id': shopping_id, 'email': email, 'url': success_url}, safe=False)
        else:
            context = self.get_context(request)
            return render(request, self.template_name, context)
    
    def get_context(self, request):
        context = {
            'publishable_key': STRIPE_PUBLISHABLE_KEY,
        }
        return context
    


class DomainSuccess(View):
    template_name = 'domain-success.html'
    def get(self, request):
        
        return render(request, self.template_name)
    




class DomainListCrateView(View, LoginRequiredMixin):
    template_name = 'domain-view.html'

    api_endpoint = GODADDY_URL + '/v1/domains/available?domain=example.guru'
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
            # print(response.text)
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




        
    # url = 'https://api.ote-godaddy.com/v1/domains/contacts/validate?marketId=en-US'
    # headers = {
    #     'accept': 'application/json',
    #     'X-Private-Label-Id': '1',
    #     'Content-Type': 'application/json',
    #     'Authorization': f'sso-key {GODADDY_API_KEY}:{GODADDY_API_SECRET}'
    # }
    

    # user = CustomUser.objects.get(email=email)
    # shopping_carts = ShoppingCard.objects.filter(user=user)
    
    # domains = shopping_carts.values(
    #             'card__products__domain'
    #         )

    # domain_list = [item['card__products__domain'] for item in domains]

    # # Füge die Liste der Domains in das vorhandene JSON-Objekt ein
    # # existing_json = {"domains": domain_list}
    
    # print(f'order Domains: {domain_list}')
    
    # data = [{
    #     'email': user.email,
    #     'address': user.address,
    #     'zip_code': user.zip_code,
    #     'city': user.city,
    #     'first_name': user.first_name,
    #     'last_name': user.last_name
    # }]

    # data = {
    #         "contactAdmin": {
    #             "addressMailing": {
    #                 "address1": user.address,
    #                 "address2": "string",
    #                 "city": user.city,
    #                 "country": "US",
    #                 "postalCode": user.zip_code,
    #                 "state": "string"
    #                 },
    #             "email": user.email,
    #             "fax": "string",
    #             "jobTitle": "string",
    #             "nameFirst": user.first_name,
    #             "nameLast": user.last_name,
    #             "nameMiddle": "string",
    #             "organization": "string",
    #             "phone": "string"
    #         },
    #         "contactBilling": {
    #             "addressMailing": {
    #             "address1": user.address,
    #             "address2": "string",
    #             "city":  user.city,
    #             "country": "US",
    #             "postalCode": "string",
    #             "state": "string"
    #             },
    #             "email": user.email,
    #             "fax": "string",
    #             "jobTitle": "string",
    #             "nameFirst": user.first_name,
    #             "nameLast": user.last_name,
    #             "nameMiddle": "string",
    #             "organization": "string",
    #             "phone": "string"
    #         },
    #         "contactPresence": {
    #             "addressMailing": {
    #             "address1": user.address,
    #             "address2": "string",
    #             "city":  user.city,
    #             "country": "US",
    #             "postalCode": "string",
    #             "state": "string"
    #             },
    #             "email": user.email,
    #             "fax": "string",
    #             "jobTitle": "string",
    #             "nameFirst": user.first_name,
    #             "nameLast": user.last_name,
    #             "nameMiddle": "string",
    #             "organization": "string",
    #             "phone": "string"
    #         },
    #         "contactRegistrant": {
    #             "addressMailing": {
    #             "address1": user.address,
    #             "address2": "string",
    #             "city":  user.city,
    #             "country": "US",
    #             "postalCode": "string",
    #             "state": "string"
    #             },
    #             "email": user.email,
    #             "fax": "string",
    #             "jobTitle": "string",
    #             "nameFirst": user.first_name,
    #             "nameLast": user.last_name,
    #             "nameMiddle": "string",
    #             "organization": "string",
    #             "phone": "string"
    #         },
    #         "contactTech": {
    #             "addressMailing": {
    #             "address1": "string",
    #             "address2": "string",
    #             "city": "string",
    #             "country": "US",
    #             "postalCode": "string",
    #             "state": "string"
    #             },
    #             "email": "user@example.com",
    #             "fax": "string",
    #             "jobTitle": "string",
    #             "nameFirst": "string",
    #             "nameLast": "string",
    #             "nameMiddle": "string",
    #             "organization": "string",
    #             "phone": "string"
    #         },
    #         "domains": domain_list,
    #         "entityType": "ABORIGINAL"
    #         }    
    
    # try:
    #     response = requests.post(url, json=data, headers=headers)
    #     response_data = response.json()
    #     print(f"GoDaddy API Response: {response_data}")
    #     return JsonResponse(response_data)
    # except requests.RequestException as e:
    #     return JsonResponse({'error': str(e)}, status=500)