# Generated by Django 3.2 on 2023-10-31 08:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('monthly_price', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('tax', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
                ('stage', models.CharField(choices=[('Growth', 'Growth'), ('Core', 'Core'), ('Premium', 'Premium')], default='Growth', max_length=10)),
                ('active', models.BooleanField(default=True)),
                ('content', models.TextField(blank=True, null=True)),
                ('monthly_price_savings', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
                ('savings_price', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
                ('payment_abo', models.BooleanField(default=True)),
                ('price_id', models.CharField(blank=True, default='price_1O6ZIkFJc5Umrifwi3hxGJ74', max_length=100)),
                ('button_id', models.CharField(blank=True, default='checkout-button', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='PromoCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=20, unique=True)),
                ('discount_percentage', models.DecimalField(decimal_places=2, max_digits=5)),
                ('valid_from', models.DateTimeField()),
                ('valid_to', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('active', models.BooleanField(default=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='promo_code',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.promocode'),
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_number', models.CharField(max_length=16)),
                ('exp_month', models.CharField(max_length=2)),
                ('exp_year', models.CharField(max_length=4)),
                ('cvc', models.CharField(max_length=3)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
