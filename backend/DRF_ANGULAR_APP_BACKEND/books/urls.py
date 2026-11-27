from rest_framework import routers
from books import views
from django.urls import path, include
from books.views import BookViewSet

router = routers.DefaultRouter()
router.register(r'books', views.BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('book-categories/', views.BooksCategoryView.as_view(), name='book-categories')
]