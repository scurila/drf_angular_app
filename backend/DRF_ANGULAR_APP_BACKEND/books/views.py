from django.shortcuts import render
from .models import Book
from rest_framework import viewsets
from books.serializers import BookSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]  # Allow any user to access the API

class BooksCategoryView(APIView):
    permission_classes = [AllowAny]  # Allow any user to access the API

    def get(self, request):
        categories = [choice[0] for choice in Book.CATEGORY_CHOICES]
        return Response(categories)