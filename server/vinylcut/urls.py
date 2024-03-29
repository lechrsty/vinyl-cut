from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from vinylcutapi.views import login_user, register_user
from rest_framework import routers
from vinylcutapi.views import AlbumView, MemberView, AOTMView, TasteView, ReviewView, CommentView, GenreView, RatingView, EmployeeView


router = routers.DefaultRouter(trailing_slash=False)
router.register(r'albums', AlbumView, 'album')
router.register(r'members', MemberView, 'member')
router.register(r'aotms', AOTMView, 'aotm')
router.register(r'tastes', TasteView, 'taste')
router.register(r'reviews', ReviewView, 'review')
router.register(r'comments', CommentView, 'comment')
router.register(r'genres', GenreView, 'genre')
router.register(r'ratings', RatingView, 'rating')
router.register(r'employees', EmployeeView, 'employee')



urlpatterns = [
    path('admin/', admin.site.urls),
    path('register', register_user),
    path('login', login_user),
    path('', include(router.urls)),
    path('members/<int:pk>/selections', MemberView.as_view({'put': 'update_selections'})),

]
