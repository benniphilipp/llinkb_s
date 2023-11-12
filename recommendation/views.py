import requests

from django.views import View
from django.http import JsonResponse
from django.shortcuts import render

from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse

from django.utils.translation import gettext_lazy as _

from django.conf import settings
default_from_email = settings.DEFAULT_FROM_EMAIL

from .models import Recommendation
from accounts.models import CustomUser

class RecommendationSend(View):
    def post(self, request):
        try:
            if request.method == 'POST':
                email = request.POST.get('email')
                
                existing_user = CustomUser.objects.filter(email=email).first()
            
                if existing_user:
                    response_data = {'success': False, 'message': 'User with this email address already exists.'}
                else:
                    
                    # Erstellt Empfelung
                    recommendation_instance = Recommendation(
                        referred_by = request.user,
                        referred_to_email = email
                    )
                    recommendation_instance.save()
                    
                    # Erstellt neuen User
                    user = CustomUser.objects.create_user(email=email, password='zufallspasswort')
                    user.recommended = 'recommended'
                    user.save()
                    
                    # Verknüpfe den neuen Benutzer mit dem bereits vorhandenen Benutzer
                    request.user.recommended_user.add(recommendation_instance)
                    
                    # Anmelde Datensenden eine E-Mail mit dem Link zur Passwortänderung            
                    token = default_token_generator.make_token(user)
                    current_site = get_current_site(request)
                    uid = urlsafe_base64_encode(force_bytes(user.pk))
                    reset_url = reverse('password_reset_confirm', args=[uid, token])

                    mail_subject = _(f"Recommendation from {request.user}")
                    message = _(f'Hello,\n\n' \
                                f'{request.user} recommended you on llinkb.com! You re probably wondering what he/she recommended you for.\n\n' \
                                'We offer a great link shortening and LinkInBio platform that allows you to shorten links and create LinkInBio pages in no time. With our tools you can easily integrate your links into your social media.\n\n' \
                                'The best part is that everything is completely free! You can get started immediately and benefit from the advantages of our platform.\n\n' \
                                f'Click on the following link to register and use all functions: {current_site}{reset_url} \n\n' \
                                'We look forward to welcoming you to our community. \n\n' \
                                'PS: If you do not agree, the request will be deleted within 48 hours and you will never receive anything from us again.\n\n' \
                                'If you have any further questions or suggestions, send an email to: contact@llinkb.com \n\n' \
                                'Best regards, \n\n' \
                                'Team llinkb.com  \n\n')
                    
                    send_mail(mail_subject, message, default_from_email, [email],fail_silently=False)                    
                    
                    response_data = {'success': True, 'message': _('You successfully recommended us, thank you.')}
            return JsonResponse(response_data)
        
        except Exception as e:
            
            print(f"Ein Fehler ist aufgetrten: {e}")
            response_data = {'success': False, 'message': _('An error occurred: {e}')}
            return JsonResponse(response_data)
            


class RecommendationView(View):
    def get(self, request):
        try:
            recommendation_instances = Recommendation.objects.filter(referred_by=request.user)

            data = []
            for recommendat in recommendation_instances:
                # Erstelle ein Dictionary für jede Empfehlung und füge es zu data hinzu
                recommendation_data = {
                    'email': recommendat.referred_to_email,
                    'status': recommendat.status_change,
                }
                data.append(recommendation_data)

            return JsonResponse({'recommendation': data})
            
        except Recommendation.DoesNotExist:
            return JsonResponse({'error': _('Recommendation not found.')}, status=404)

