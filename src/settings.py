import os
import environ
from pathlib import Path
import urllib3
from django.utils.translation import gettext_lazy as _

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env(
    ENVIRONMENT=(str, "local"),
    DEBUG=(bool, False)
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

environ.Env.read_env(os.path.join(BASE_DIR, '.env'))


ENVIRONMENT = env('ENVIRONMENT')
DEBUG = env('DEBUG')
SECRET_KEY = env('SECRET_KEY')


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django.contrib.flatpages',
    'translations',
    
    #Party
    'rest_framework',
    'rest_framework.authtoken',
    'taggit',
    'fontawesomefree',
    'corsheaders',
    'crispy_forms',
    "crispy_bootstrap4",
    'django_hosts',
    'ckeditor',

    #apps
    'geotargeting',
    'linkinbio',
    'shortcode',
    'accounts',
    'analytics',
    'webclicktracker',
    
    'products',
    'contentpages',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.locale.LocaleMiddleware',
]

ROOT_URLCONF = 'src.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'Custom',
        'toolbar_Custom': [
            ['Bold', 'Italic', 'Underline'],
            ['Link'],
            ['NumberedList', 'BulletedList'],
            ['RemoveFormat'],
            ['Source'],
        ],
    },
}

WSGI_APPLICATION = 'src.wsgi.application'

if ENVIRONMENT == 'local':
    
    ALLOWED_HOSTS=['127.0.0.1', 'localhost', 'ngrok-free.app', '1442-185-58-55-54.ngrok-free.app']

    DATA_UPLOAD_MAX_NUMBER_FIELDS = 10000

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'), #BASE_DIR / 'db.sqlite3',
        }
    }

    # Password validation
    # https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

    AUTH_PASSWORD_VALIDATORS = [
        {
            'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
        },
    ]

    gettext = lambda s: s
    LANGUAGES = [
        ('de', _('German')),
        ('en', _('English')),
    ]

    MODELTRANSLATION_CUSTOM_FIELDS = ('subline')

    CORS_ORIGIN_ALLOW_ALL = True   

    TIME_ZONE = 'Europe/Berlin'

    LANGUAGE_CODE = 'de'

    USE_I18N = True

    USE_TZ = True

    DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

    DEFAULT_HOST = 'www'
    DEFAULT_REDIRECT_URL = "http://www.127.0.0.1:8000"
    PARENT_HOST = "127.0.0.1:8000"

    ROOT_HOSTCONF = 'src.hosts'

    LOGIN_REDIRECT_URL = '/'
    LOGIN_URL = 'accounts:login'
    SESSION_COOKIE_AGE = 60 * 60 * 24 * 30

    AUTH_USER_MODEL = "accounts.CustomUser"

    CRISPY_ALLOWED_TEMPLATE_PACKS = "bootstrap4"
    CRISPY_TEMPLATE_PACK = "bootstrap4"

    SHORTCODE_MAX = 15
    SHORTCODE_MIN = 6

    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = 'localhost'
    EMAIL_PORT = 1025  # Port für den lokalen SMTP-Server
    EMAIL_USE_TLS = False
    EMAIL_USE_SSL = False

    STRIPE_PUBLISHABLE_KEY="pk_test_51IsiJyFJc5UmrifwduovCZUK4RtJUMVxlwvpdUBkdY3FPvMbvJxKbPEltPxUVTJBZZlnexWOrtSe1Cl4QR4wyj8I00WxFYVMCP"
    STRIPE_SECRET_KEY = 'sk_test_51IsiJyFJc5UmrifwOQgJLb7csupuvjK7pIMgaWtKwKZhQONa1X4vug0Af45qOdpjr3729kYRjgYrWjMh7QeNl8pN008dlBQ8Kr'

    SITE_ID = 4
    USE_I18N = True
    USE_L10N = True

    STATICFILES_DIRS = [
        os.path.join(BASE_DIR, "static"),
    ]

    STATIC_URL = '/static/'
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, "media")


## Produktions 
if ENVIRONMENT == 'production':
    
    ALLOWED_HOSTS = ['llinkb.com', 'www.llinkb.com', 'localhost']
    
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'myproject',
            'USER': 'myprojectuser',
            'PASSWORD': 'Benphi86!',
            'HOST': 'localhost',
            'PORT': '',
        }
    }

    CORS_ORIGIN_ALLOW_ALL = True   
    SECURE_SSL_REDIRECT = True
    USE_X_FORWARDED_HOST = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

    TIME_ZONE = 'Europe/Berlin'

    LANGUAGE_CODE = 'de-de'

    USE_I18N = True

    USE_TZ = True

    DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

    STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]

    STATIC_URL = '/static/'
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, "media")


    DEFAULT_HOST = 'www'
    DEFAULT_REDIRECT_URL = "http://www.llinkb.com"
    PARENT_HOST = "llinkb.com" 

    ROOT_HOSTCONF = 'src.hosts'

    LOGIN_REDIRECT_URL = '/'
    LOGIN_URL = 'accounts:login'
    SESSION_COOKIE_AGE = 60 * 60 * 24 * 30

    AUTH_USER_MODEL = "accounts.CustomUser"

    CRISPY_ALLOWED_TEMPLATE_PACKS = "bootstrap4"
    CRISPY_TEMPLATE_PACK = "bootstrap4"

    SHORTCODE_MAX = 15
    SHORTCODE_MIN = 6

    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = 'localhost'
    EMAIL_PORT = 1025 
    EMAIL_USE_TLS = False
    EMAIL_USE_SSL = False
    
    STRIPE_SECRET_KEY = env('STRIPE_SECRET_KEY')
    STRIPE_PUBLISHABLE_KEY = env('STRIPE_PUBLISHABLE_KEY')
