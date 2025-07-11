from django.shortcuts import redirect
from django.urls import reverse

class LoginRequiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        exempt_urls = [
            reverse('login'),
            reverse('register'),
            '/admin/',
            '/static/',
            '/media/',
        ]
        
        if not request.user.is_authenticated and not any(
            request.path.startswith(url) for url in exempt_urls
        ):
            return redirect(reverse('login'))
        return None