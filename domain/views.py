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
