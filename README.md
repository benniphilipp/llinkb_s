Django APPs:

# Shortcode
python3 manage.py startapp shortcode

# Analytics
python3 manage.py startapp analytics

# Geo-Targeting
python3 manage.py startapp geotargeting

# Tracking AI
python3 manage.py startapp trackingai
# Link in Bio
python3 manage.py startapp linkinbio

# WebClickTracker
python3 manage.py startapp webclicktracker

# products
python manage.py startapp products

# contentpages
python manage.py startapp contentpages

# Acounts
python manage.py startapp accounts

# Link in Bio Seite
python manage.py startapp linkinbio

# Domain 
python manage.py startapp domain

# Recommendation
python3 manage.py startapp recommendation

# QR-Code
    Neues Module

# Campaign
https://support.bitly.com/hc/en-us/articles/115001195167

# Django CMD
python3 manage.py makemigrations && python3 manage.py migrate

python3 manage.py runserver

python3 manage.py runserver 0.0.0.0:8000

python manage.py collectstatic
python manage.py createsuperuser

python3 manage.py startapp APP_NAME

python manage.py compress

# Pip
pip freeze > requirements.txt
pip install -r requirements.txt

pip3 uninstall 

# Server
sudo reboot

source myprojectenv/bin/activate
python manage.py clearcache

# ENV
. env/bin/activate
. myprojectenv/bin/activate


# Github

    - Branrch
    git branch --list
    git branch _name
    git checkout _name

    - Push
    git add .
    git commit -m '_text'
    git push origin linkinbio


# Überstzung
- python manage.py makemessages -l de
- python manage.py makemessages -l en
- python manage.py compilemessages

    - from django.utils.translation import gettext_lazy as _
    - {% trans "Welcome" %}
    
# SMTP
python -m smtpd -n -c DebuggingServer localhost:1025

# Test Nutzer
@name
ben@mail.de
&2NNe%qy^vIjtjy6 

ben@web05.com
&2NNe%qy^vIjtjy6

1ben@web.de
&2NNe%qy^vIjtjy6

pw@web.de
&2NNe%qy^vIjtjy6

benniph86@gmail.com
TqXRm5ikowzmYtZVyCMC

# ToDo liste 4.11.23

- Push
    git add .
    git commit -m '_text'
    git push origin 


- git push --set-upstream origin domain


- Analytics Dahboard Anpssen 
    - Clicks nach Buttton Label
    - Clicks Country 
    - Clicks City
    - Clicks Referrer
    - clicks Device


- Cookie Banner DSGVO
    - Cookie Banner für LinkInBio Page

    - Abrufen von JavaScript-Dateien serverseitig oder normal
        Facebook Script
        Google Tag Manger
        Analytics

    - Design und Funktion
        Normales Banner zum auswälen welche daten man speichern kann.

        + Crate neuen link
            - Datum wie lange Verfügbar

        + Style
            font 
        

- Qr-Code Pages Crator
- limitation, 
- Android Targeting
- Ios Targeting BETA 
- Version GEO Targeting
- Eigene Domain kaufen für Branding
- Verwaltung von Abonnements Abmelden
- Add Youtube Video Iframe
- Podcast Irame
- Gefärdete Domains Abfrage und Sperrung
- Kampannien Manger
- Fonts * adjustmentFonts.js
- Zahlungs Anbiter Paypal
- Google Sheets Einbindung

# BUG ERLEDIGT
- @ToDo Link in Bio
* Link in Bio Module erleding
    - user
    - Links erstellen und verbinden erledigt
    - Link liste anzeigen und sortieren erledigt
    - sozialen Crate und View erledigt
        Facebook -
        Instagram -
        YouTube -
        Vimeo -
        Xing -
        LinkedIn -
        Pinterest -
        Twitter -
        Twitch -
        TikTok -
        Reddit -
        Tumblr -
        Snapchat -
        Discord -
    - sozialen löschen --erledigt
    - Image Profile --erledigt
    - Image Hinteregund --erledigt
    - Titel --erledigt
    - Beschreibung --erledigt
+ links
    - Name link --erledigt
    - selection links --erledigt

+ Style
    color --erledigt
- LinkInBio mit Shorcode Vergnüpfen --erleding
- Live einrichten --erleding
    - Preise hinterlegen --erleding
    - Soziale Media Hinterlgen Icons --erledigt
    - E-Mail Testen Empfelungs User --erleding
    - LinkInBio Seite erstellen --erleding
- Formular für weiterempelung --erledigt
- Übersezung Crate Shortcode Erfolgsmeldeung Website erreichbar --erleding
- Produkt seite Button Style Tauschen --erleding
- Stripe URL und Stipe englisch anpassen --erleding
- favicon LinkInBioPage --erleding
- Automasticher Tags bei link in bio Seite und in Shorcode Extra Makieren --erledigt
- Text Bustaben Zählung bei LinkInBio Seite Abrufen auch nicht nur bei Tippen --erldeigt
- Bug Shorcode hinzufühgen LinkInBio Page --erldeigt
- Sozial Medai Links Sortierung Backend und Frontad --erldeigt
- Button Image --erldeigt
- Einzelansicht LinkInBio Page --erledigt
- Mobile Ansicht LinkInBio Page User --erledigt
- Zahlung Funktion Prüfen erledigt
- Danke Seite nach Zahlung erledigt
- E-Mail-Benachrichtigungen Zahlung erledigt
- Shortcode Archive Pages erledigt
- Shortcode Archive erledigt
- Shortcode begrenzung auf 30 Stück erledigt
- Shortcode Crate Form schliessen erledigt
- Shorcode Tag Model translate erledigt
- Shortcode Ansicht Mobile erledigt
- Siedbar Desktop Version Design erledigt
- Meldung Hinweis translate erledigt
- LinkInBio List für Fehler in Javascript !erledigt
- E-Mail Bestätigung und Passwort zurück stezen. !erledigt
- Logo & Favicon austauschen !erledigt
- User Type zum Model hinzufühgen !erledigt
- Tags nur für User Anzeigen !erledigt
- Tags nach dem Erstellen laden. !erleding
- Archive keine ansicht für user. !erleding
- Archive rückganig machen. !erleding
- Shorcode Löschen. !erleding
- Abrufen von mÖglichkeiten in der URL View !erldeigt
- Überstzung einbauen !erldeigt
- Überszungssetings Ansicht aktuelle sprache anzeigen. !erldeigt
- Startseite ist nicht erreichbar !erldeigt
- Crate Script adjustment
- Add Image !erledingt
- Remove Image !erledingt
- Image View !erledingt
- Crate and titel, description !erledingt
- Add Social media and Remove Social media * adjustmentSocial.js --> !erledingt
- Color Button * adjustmentColor.js !erldeigt
- Stipe einbinden und alle Formular bereistellen. !erldeigt
- Frontend-Anpassungen !erldeigt
- Stripe-Zahlungsverarbeitung !erldeigt
- Erstellen Sie Abonnements !erldeigt
- Benutzerprofil aktualisieren !erldeigt
- Neues Module Pages
- Update Anpassungen Header !erledigt
- Update Header Menü erstellen !erledigt --> https://codingyaar.com/bootstrap-navbar-button-right/
- Models überstzebar machen !erledigt
- Bug Überstzung seiten !erledigt --> https://pypi.org/project/django-translations/
- Hero Pages !erledigt
- Marketing Section Pages !erledigt
- Django's Flatpages App !erldeigt
- Home Page und Pages HTML, css zusammen fühgen !erleding
- Menus auf Home seite einbinden !erleding
- Bilder Verkleinern auf Home !erleding
- Texte anpssen auf der Startseite !erleding
- Login Prüfen Designe !erleding
- Überszung Prüfen !erleding
- Mobile Prüfen !erleding
- Cookie für Überszung Prüfen final !erleding

# Google Sheets
- https://pypi.org/project/django-gsheets/

# Neue Ideen
- IP Gefärliche IP Sicherung einbauen --> https://chat.openai.com/c/f6d2978c-6cb7-44ba-9c1b-918ee67a37b0
- Externe Doamin Testen wen die Server einstellungen stimmen.
- Notweiterleitung unter Profile Einstellungen
- first cklick in der Analyse und im Targeting

- Anwendungen text seiten neues Module für SEO ready
- Link speeren

# Stripe Webhook
stripe listen --forward-to http://localhost:8000/stripe-webhook/

stripe login
https://stripe.com/docs/payments/quickstart

#  Webhook Softwar 
- https://dashboard.ngrok.com/settings

# Framworks
https://apexcharts.com/features/

# API View
website_title
website_url
referrer
ip_address
os
device
browser

# Sontiges
https://www.chartjs.org/docs/latest/charts/bar.html
https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript
https://stackoverflow.com/questions/3514784/how-to-detect-a-mobile-device-using-jquery
https://www.bl.ink/blog/how-blink-uses-short-links

# Bilder Suche
https://www.freepik.com/author/vectorjuice

# Vertrieb
https://www.capterra.com/
https://www.producthunt.com/
https://appsumo.com/
https://saaspirate.com/
https://saasmantra.com/partners
https://dealmirror.com/
https://pitchground.com/
https://www.rockethub.com/
https://saaszilla.co/
https://www.capterra.com/
https://saasmantra.com/partners

# APIs
https://www.geonames.org/export/web-services.html
https://urlhaus.abuse.ch/api/#submit
https://developer.godaddy.com/doc


#  Google Suche
https://www.google.com/search?q=kurzlinks+erstellen&sca_esv=561558033&sxsrf=AB5stBhFKA56I66QGdIKmpFzQw_tkpVo2w:1693472575130&ei=P1fwZPq2B4eFxc8P3tGB8Aw&start=0&sa=N&ved=2ahUKEwi60pv6xIaBAxWHQvEDHd5oAM44ChDy0wN6BAgKEAQ&biw=2216&bih=1125&dpr=2

# Login
https://dev.to/earthcomfy/django-social-authentication-imk

# Überstzung
https://poeditor.com/projects/view?id=659859


# Single select
https://apalfrey.github.io/select2-bootstrap-5-theme/examples/single-select/

# Coding Guidelines


# Live Server

    git status

    source env/bin/activate
    deactivate

    git pull
    python3 manage.py makemigrations 
    python3 manage.py migrate
    python3 manage.py collectstatic

    sudo ls -l /etc/postgresql/11/second

    sudo systemctl daemon-reload
    sudo systemctl restart gunicorn
    sudo systemctl status gunicorn


    sudo systemctl restart nginx

    Wagtail
    sudo systemctl restart wagtail_gunicorn
    sudo systemctl status wagtail_gunicorn

    Server neu Starten
    sudo reboot