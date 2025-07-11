from django.shortcuts import redirect
from django.urls import reverse

class LoginRequiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    
    def process_view(self, request, view_func, view_args, view_kwargs):
        # URLs that DO NOT require login
        exempt_urls = [
            reverse('login'),       # Login page
            reverse('register'),      # Signup page
            '/admin/',              # Django admin (optional)
            '/static/',             # Static files (CSS/JS)
            '/media/',              # Uploaded media files
        ]

        # Check if current URL is exempt
        if any(request.path.startswith(url) for url in exempt_urls):
            return None  # Allow access

        # Redirect to login if not authenticated
        if not request.user.is_authenticated:
            return redirect('login')  # Change 'login' to your login URL name

        return None  # Proceed for authenticated users