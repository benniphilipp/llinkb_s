# Generated by Django 3.1 on 2023-10-31 10:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('shortcode', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='LinkInBio',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=200, null=True)),
                ('description', models.CharField(blank=True, max_length=500, null=True)),
                ('profile_image', models.ImageField(blank=True, null=True, upload_to='link_bio_profile_images/')),
                ('image', models.ImageField(blank=True, null=True, upload_to='link_bio_images/')),
                ('start_date', models.DateTimeField(blank=True, null=True)),
                ('end_date', models.DateTimeField(blank=True, null=True)),
                ('selected_template', models.TextField(blank=True, null=True)),
                ('is_aktiv', models.BooleanField(default=True)),
                ('crate_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='SocialMediaPlatform',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('icon_svg', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='UrlSocialProfiles',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url_social', models.URLField(blank=True, null=True)),
                ('order', models.PositiveIntegerField(default=0)),
                ('link_in_bio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='linkinbio.linkinbio')),
                ('social_media_platform', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='linkinbio.socialmediaplatform')),
            ],
        ),
        migrations.AddField(
            model_name='linkinbio',
            name='social_media_platforms',
            field=models.ManyToManyField(blank=True, to='linkinbio.UrlSocialProfiles'),
        ),
        migrations.AddField(
            model_name='linkinbio',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='CustomSettings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('settings_json', models.JSONField()),
                ('link_in_bio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='linkinbio.linkinbio')),
            ],
        ),
        migrations.CreateModel(
            name='LinkInBioLink',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0)),
                ('is_aktiv', models.BooleanField(default=True)),
                ('link_in_bio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='linkinbio.linkinbio')),
                ('shortcode', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shortcode.shortcodeclass')),
            ],
            options={
                'unique_together': {('link_in_bio', 'shortcode')},
            },
        ),
    ]
