import json

import logging

logger = logging.getLogger(__name__)

from django.urls import reverse
from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from django.views.generic.detail import DetailView


from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.core.mail import send_mail
from django.core.mail import get_connection, EmailMessage
from django.conf import settings
from django.shortcuts import get_object_or_404

from django.http import HttpResponseRedirect
import requests
from django.http import JsonResponse

from accounts.models import CustomUser
from .models import Product
from accounts.forms import ProfileFormAdresse
from .forms import CheckoutForm, PaymentForm

from django.utils.translation import gettext_lazy as _

from products.models import DomainProduct, DomainWishlist, ShoppingCard

# Stripe
import stripe
from django.conf import settings
from django.http import JsonResponse

STRIPE_SECRET_KEY = settings.STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY = settings.STRIPE_PUBLISHABLE_KEY
stripe.api_key = STRIPE_SECRET_KEY

YOUR_DOMAIN = settings.YOUR_DOMAIN


# Domain 
GODADDY_API_KEY = settings.GODADDY_API_KEY
GODADDY_API_SECRET = settings.GODADDY_API_SECRET
GODADDY_URL = settings.GODADDY_URL



def success(request):
    return render(request, 'success.html')

def cancel(request):
    return render(request, 'cancel.html')

class ProductListView(View):
    template_name = 'products_list.html'

    def get(self, request):
        products = Product.objects.filter(active=True)
        
        context = {
            'publishable_key': STRIPE_PUBLISHABLE_KEY,
            'products': products,
            'user': request.user
        }
        
        # if request.user.is_authenticated:
        #     context['user'] = request.user
        return render(request, self.template_name, context)
    

@csrf_exempt
def create_checkout_session_subscription(request):
    current_language = request.LANGUAGE_CODE
    email = request.user.email
    
    product_id = request.GET.get('product_id')
    product = Product.objects.get(id=product_id)
    
    session = stripe.checkout.Session.create(
    payment_method_types=['card'],
    line_items=[{
        'price': product.price_id,
        'quantity': 1,
    }],
    mode='subscription',
    customer_email= email,
    success_url=YOUR_DOMAIN + '/' + current_language + '/products/success',
    cancel_url=YOUR_DOMAIN + '/' + current_language + '/products/cancel',
    )
    return JsonResponse({'id': session.id})


@csrf_exempt
def create_checkout_session(request):
    current_language = request.LANGUAGE_CODE
    email = request.user.email
    
    product_id = request.GET.get('product_id')
    product = Product.objects.get(id=product_id)
    print(product_id)
    session = stripe.checkout.Session.create(
    payment_method_types=['card'],
    line_items=[{
        'price_data': {
            'currency': 'usd',
            'product_data': {
                'name': product.name,
            },
            'unit_amount': int(product.price * 100),
        },
        'quantity': 1,
    }],
    mode='payment',
    customer_email= email,
    success_url=YOUR_DOMAIN + '/' + current_language + '/products/success',
    cancel_url=YOUR_DOMAIN + '/' + current_language + '/products/cancel',
    )
    return JsonResponse({'id': session.id})




@csrf_exempt
@require_POST
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    endpoint_secret = settings.ENDPOINT_SECRET  # Setzen Sie Ihr eigenes Secret

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        return HttpResponse(status=400)

    if event.type == 'payment_intent.succeeded':
        try:
            handle_payment_intent_succeeded(event)
        except Exception as e:

            return HttpResponse(status=500)

        return HttpResponse(status=200)

    return HttpResponse(status=200)



def handle_payment_intent_succeeded(event):

    payment_intent = event['data']['object']
    payment_intent_metadata = payment_intent['metadata']
    
    # Hier Domain Kauf
    if 'product_cat' in payment_intent_metadata:
        product_type = payment_intent_metadata['product_cat']
    else:
        print('product_cat nicht in den Metadaten gefunden')
    
    email = payment_intent['receipt_email']
        
    if product_type == 'domain':
        handle_physical_product_purchase(product_type, email)
    else:
        handle_service_purchase(payment_intent)


def handle_physical_product_purchase(payment_intent, email):
    
    url = 'https://api.ote-godaddy.com/v1/domains/contacts/validate?marketId=en-US'
    headers = {
        'accept': 'application/json',
        'X-Private-Label-Id': '1',
        'Content-Type': 'application/json',
        'Authorization': f'sso-key {GODADDY_API_KEY}:{GODADDY_API_SECRET}'
    }
    

    user = CustomUser.objects.get(email=email)
    shopping_carts = ShoppingCard.objects.filter(user=user)
    
    domains = shopping_carts.values(
                'card__products__domain'
            )

    domain_list = [item['card__products__domain'] for item in domains]

    # Füge die Liste der Domains in das vorhandene JSON-Objekt ein
    # existing_json = {"domains": domain_list}
    
    print(f'order Domains: {domain_list}')
    
    data = [{
        'email': user.email,
        'address': user.address,
        'zip_code': user.zip_code,
        'city': user.city,
        'first_name': user.first_name,
        'last_name': user.last_name
    }]

    data = {
            "contactAdmin": {
                "addressMailing": {
                    "address1": user.address,
                    "address2": "string",
                    "city": user.city,
                    "country": "US",
                    "postalCode": user.zip_code,
                    "state": "string"
                    },
                "email": user.email,
                "fax": "string",
                "jobTitle": "string",
                "nameFirst": user.first_name,
                "nameLast": user.last_name,
                "nameMiddle": "string",
                "organization": "string",
                "phone": "string"
            },
            "contactBilling": {
                "addressMailing": {
                "address1": user.address,
                "address2": "string",
                "city":  user.city,
                "country": "US",
                "postalCode": "string",
                "state": "string"
                },
                "email": user.email,
                "fax": "string",
                "jobTitle": "string",
                "nameFirst": user.first_name,
                "nameLast": user.last_name,
                "nameMiddle": "string",
                "organization": "string",
                "phone": "string"
            },
            "contactPresence": {
                "addressMailing": {
                "address1": user.address,
                "address2": "string",
                "city":  user.city,
                "country": "US",
                "postalCode": "string",
                "state": "string"
                },
                "email": user.email,
                "fax": "string",
                "jobTitle": "string",
                "nameFirst": user.first_name,
                "nameLast": user.last_name,
                "nameMiddle": "string",
                "organization": "string",
                "phone": "string"
            },
            "contactRegistrant": {
                "addressMailing": {
                "address1": user.address,
                "address2": "string",
                "city":  user.city,
                "country": "US",
                "postalCode": "string",
                "state": "string"
                },
                "email": user.email,
                "fax": "string",
                "jobTitle": "string",
                "nameFirst": user.first_name,
                "nameLast": user.last_name,
                "nameMiddle": "string",
                "organization": "string",
                "phone": "string"
            },
            "contactTech": {
                "addressMailing": {
                "address1": "string",
                "address2": "string",
                "city": "string",
                "country": "US",
                "postalCode": "string",
                "state": "string"
                },
                "email": "user@example.com",
                "fax": "string",
                "jobTitle": "string",
                "nameFirst": "string",
                "nameLast": "string",
                "nameMiddle": "string",
                "organization": "string",
                "phone": "string"
            },
            "domains": domain_list,
            "entityType": "ABORIGINAL"
            }    
    
    try:
        response = requests.post(url, json=data, headers=headers)
        response_data = response.json()
        print(f"GoDaddy API Response: {response_data}")

    except requests.RequestException as e:
        print(f"error: {str(e)}")

    
    


def handle_service_purchase(payment_intent):
    # Logik für den Kauf von Dienstleistungen
    pass



# @csrf_exempt
# @require_POST
# def stripe_webhook(request):
#     payload = request.body
#     sig_header = request.META['HTTP_STRIPE_SIGNATURE']
#     endpoint_secret = settings.ENDPOINT_SECRET


#     try:
#         event = stripe.Webhook.construct_event(
#             payload, sig_header, endpoint_secret
#         )
#     except ValueError as e:
#         # Invalid payload
#         return JsonResponse({'error': str(e)}, status=400)
#     except stripe.error.SignatureVerificationError as e:
#         # Invalid signature
#         return JsonResponse({'error': str(e)}, status=400)

#     if event.type == 'payment_intent.succeeded':
#         # Extrahieren Sie die relevanten Informationen aus dem Event
#         session = event['data']['object']
#         charges = session['charges']['data']

#         for charge in charges:
#             email = charge['billing_details']['email']

#         # Finden Sie den Benutzer anhand der Kunden-ID oder anderen Informationen
#         user = CustomUser.objects.get(email=email)

#         # Aktualisieren Sie den Benutzerstatus
#         user.free_user = False
#         user.save()
        
#         receiver_email = email  # Setzen Sie die E-Mail-Adresse des Kunden
#         subject = _("Payment successful!")
#         message = _("Your payment has been successfully processed. Thank you!")
#         from_email = 'contact@llinkb.com'
        
#         connection = get_connection(username=settings.EMAIL_HOST_USER, password=settings.EMAIL_HOST_PASSWORD)
#         email = EmailMessage(subject, message, from_email, [receiver_email], connection=connection)

#         # E-Mail senden
#         email.send()

#     return JsonResponse({'message': 'Webhook received successfully'}, status=200)


