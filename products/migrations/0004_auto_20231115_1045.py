# Generated by Django 3.1 on 2023-11-15 09:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_domainproduct_domainwishlist_shoppingcard'),
    ]

    operations = [
        migrations.RenameField(
            model_name='domainwishlist',
            old_name='produkts',
            new_name='products',
        ),
    ]