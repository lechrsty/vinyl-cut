# Generated by Django 4.1.7 on 2023-03-17 17:21

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
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('artist', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=200)),
                ('image_url', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bio', models.CharField(max_length=200)),
                ('image_url', models.CharField(max_length=100)),
                ('choice_one', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='first_album', to='vinylcutapi.album')),
                ('choice_three', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='third_album', to='vinylcutapi.album')),
                ('choice_two', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='second_album', to='vinylcutapi.album')),
            ],
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Taste',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=20)),
                ('description', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('artist', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=1000)),
                ('image_url', models.CharField(max_length=200)),
                ('created_on', models.DateTimeField(auto_now=True)),
                ('approved', models.BooleanField(default=True)),
                ('genre', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='genre_review', to='vinylcutapi.genre')),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='member_review', to='vinylcutapi.member')),
                ('rating', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='rating_review', to='vinylcutapi.rating')),
            ],
        ),
        migrations.AddField(
            model_name='member',
            name='taste',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='taste_member', to='vinylcutapi.taste'),
        ),
        migrations.AddField(
            model_name='member',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bio', models.CharField(max_length=200)),
                ('image_url', models.CharField(max_length=100)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.CharField(max_length=200)),
                ('created_on', models.DateTimeField(auto_now=True)),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='member_comment', to='vinylcutapi.member')),
                ('review', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='review_comment', to='vinylcutapi.review')),
            ],
        ),
        migrations.CreateModel(
            name='AOTM',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now=True)),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='album_aotm', to='vinylcutapi.album')),
                ('taste', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='taste_aotm', to='vinylcutapi.taste')),
            ],
        ),
        migrations.AddField(
            model_name='album',
            name='genre',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='genre_album', to='vinylcutapi.genre'),
        ),
        migrations.AddField(
            model_name='album',
            name='taste',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='taste_album', to='vinylcutapi.taste'),
        ),
    ]
