from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def get_notes(request):
    data = request.body.decode('utf-8')
    vid_link = request.GET['link']

    notes = []

    return JsonResponse(notes, safe=False)