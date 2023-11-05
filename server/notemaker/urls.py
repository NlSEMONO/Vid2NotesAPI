from django.urls import path
from . import views

urlpatterns = [
    # path('get-notes', views.get_notes),
    path('get-notes', views.temp),
    path('get-cards', views.fill_in_the_blanks)
]