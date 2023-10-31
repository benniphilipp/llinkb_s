# Generated by Django 3.2 on 2023-10-31 08:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('shortcode', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='IPGeolocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ip_address', models.GenericIPAddressField(blank=True, null=True)),
                ('country', models.CharField(blank=True, max_length=100, null=True)),
                ('region', models.CharField(blank=True, max_length=100, null=True)),
                ('city', models.CharField(blank=True, max_length=100, null=True)),
                ('latitude', models.FloatField(blank=True, null=True)),
                ('longitude', models.FloatField(blank=True, null=True)),
                ('os', models.CharField(blank=True, max_length=100, null=True)),
                ('device', models.CharField(blank=True, max_length=100, null=True)),
                ('browser', models.CharField(blank=True, max_length=100, null=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('referrer', models.CharField(default='Unknown Referrer', max_length=255)),
                ('shortcode', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='geolocations', to='shortcode.shortcodeclass')),
            ],
        ),
        migrations.CreateModel(
            name='DailyClick',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('short_url', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='daily_clicks', to='shortcode.shortcodeclass')),
            ],
        ),
        migrations.CreateModel(
            name='ClickEvent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.IntegerField(default=0)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('short_url', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='shortcode.shortcodeclass')),
            ],
        ),
        migrations.CreateModel(
            name='ClickData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('website_title', models.CharField(max_length=255)),
                ('website_url', models.URLField()),
                ('referrer', models.CharField(max_length=255)),
                ('ip_address', models.GenericIPAddressField()),
                ('os', models.CharField(max_length=255)),
                ('device', models.CharField(max_length=255)),
                ('browser', models.CharField(max_length=255)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
