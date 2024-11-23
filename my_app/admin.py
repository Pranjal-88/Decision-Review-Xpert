from django.contrib import admin
from .models import Player,Match

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('player_name', 'role', 'team', 'average', 'age')

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('team_name', 'format', 'date', 'time', 'venue')
    list_filter = ('format', 'date')
    search_fields = ('team_name', 'venue')