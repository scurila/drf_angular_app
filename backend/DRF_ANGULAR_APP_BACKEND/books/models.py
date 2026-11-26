from django.db import models

# Create your models here.
class Book(models.Model):
    CATEGORY_CHOICES = (
        ('Thriller', 'Thriller'),
        ('Fqantasy', 'Fantasy'),
        ('Novel', 'Novel')
    )
    
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False, blank=True)

    def __str__(self):
        return self.title