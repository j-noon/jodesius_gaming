# gallery/admin.py
from django.contrib import admin
from .models import GalleryImage
from django import forms
from cloudinary.forms import CloudinaryFileField

class GalleryImageForm(forms.ModelForm):
    class Meta:
        model = GalleryImage
        fields = '__all__'
    
    # This is the magic that adds Cloudinary widget
    image = CloudinaryFileField(
        options={
            'folder': 'gallery',       # Customize your Cloudinary folder
            'tags': ['admin_upload'],  # Optional tags
            'resource_type': 'image',  # Ensure only images
            'multiple': False,         # Single file upload
        }
    )

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    form = GalleryImageForm
    list_display = ('title', 'created_at', 'image_preview')
    readonly_fields = ('image_preview',)
    
    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" style="max-height: 100px;" />'
        return "No image"
    image_preview.allow_tags = True
    image_preview.short_description = 'Preview'
