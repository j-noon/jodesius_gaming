from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
def learning(request):
    return HttpResponse("this is our learning page")
