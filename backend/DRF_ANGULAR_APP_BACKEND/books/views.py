from .models import Book
from rest_framework import viewsets
from .serializers import BookSerializer
from rest_framework.permissions import AllowAny

# Create your views here.
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]  # Allow any user to access the API