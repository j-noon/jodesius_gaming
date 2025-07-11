from django.db import models
from cloudinary.models import CloudinaryField


# Create your models here.
class GalleryImage(models.Model):
    title = models.CharField(max_length=100)
    image = CloudinaryField('image', default='placeholder')  # 'image' is the folder in Cloudinary
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
