from django.urls import path
from .views import RegisterView, CustomLoginView, activate_account, success_view, ResetPasswordView, UserProfileView, SaveClickData, update_user_json, CustomUserJsonView, update_language, ResetPasswordSuccessView
from django.contrib.auth import views as auth_views
from accounts.forms import LoginForm

# home, Delete

# app_name = 'accounts'

urlpatterns = [
    # path('', home, name='users-home'), Delete
    path('', CustomLoginView.as_view(redirect_authenticated_user=True, template_name='accounts/login.html', authentication_form=LoginForm), name='login'),
    path('register/', RegisterView.as_view(), name='users-register'),
    path('success/', success_view, name='success_url'),
    path('logout/', auth_views.LogoutView.as_view(template_name='accounts/logout.html'), name='logout'),
    path('password-reset/', ResetPasswordView.as_view(), name='password_reset'),
    path('password-reste-success/', ResetPasswordSuccessView.as_view(), name='password_reste_success'),
    path('password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(template_name='accounts/password_reset_complete.html'), name='password_reset_complete'),
    path('profile/<pk>/', UserProfileView.as_view(), name='user-profile'),
    path('activate/<uidb64>/<token>/', activate_account, name='activate_account'),
    path('password-reset-confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='accounts/password_reset_confirm.html'), name='password_reset_confirm'),
    path('api/v1/save_click_data/', SaveClickData.as_view(), name='save_click_data'),
    path('<pk>/customer_json_adress/', CustomUserJsonView.as_view(), name='customer_json_adress'),
    path('<pk>/update_json/', update_user_json, name='update-user-json'),
    path('update_language/', update_language, name='update_language'),
]
