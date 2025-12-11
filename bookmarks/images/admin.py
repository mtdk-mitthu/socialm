from django.contrib import admin
from .models import Image

@admin.register(Image)
class Imagedmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'image', 'created']
    list_filter = ['created']