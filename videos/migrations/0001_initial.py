# Generated by Django 5.1.3 on 2024-11-23 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TrainingVideo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('video_file', models.FileField(upload_to='training_videos/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('feedback', models.JSONField(default=dict)),
            ],
        ),
    ]