# Generated by Django 3.1 on 2023-11-03 07:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('domain', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='domain',
            name='user',
        ),
    ]
