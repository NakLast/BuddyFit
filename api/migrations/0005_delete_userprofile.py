# Generated by Django 4.2.1 on 2023-06-04 16:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_userprofile_alter_buddy_user_delete_user'),
    ]

    operations = [
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]
