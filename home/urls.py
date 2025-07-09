from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),  # Handles `/home/`
    path('delete-comment/<int:comment_id>/', views.delete_comment, name='delete_comment'),
]
