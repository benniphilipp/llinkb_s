# Generated by Django 3.1 on 2023-11-01 15:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('linkinbio', '0002_auto_20231101_1629'),
        ('shortcode', '0002_auto_20231101_1629'),
    ]

    operations = [
        migrations.AddField(
            model_name='shortcodeclass',
            name='linkinbiopage',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='linkinbio.linkinbio'),
            preserve_default=False,
        ),
    ]
