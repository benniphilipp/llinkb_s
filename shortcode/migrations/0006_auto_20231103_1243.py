# Generated by Django 3.1 on 2023-11-03 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geotargeting', '0002_auto_20231101_1629'),
        ('shortcode', '0005_auto_20231103_1243'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shortcodeclass',
            name='template_geo',
            field=models.ManyToManyField(blank=True, related_name='geothemplate', to='geotargeting.GeoThemplate'),
        ),
    ]
