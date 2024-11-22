from django.db import models

class Player(models.Model):
    ROLE_CHOICES = [
        ('Batsman', 'Batsman'),
        ('Bowler', 'Bowler'),
    ]

    player_id = models.AutoField(primary_key=True)  # Auto-incrementing ID for the player
    player_name = models.CharField(max_length=100)  # Name of the player
    age = models.IntegerField()  # Age of the player
    team = models.CharField(max_length=100)  # Team name
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)  # Player's role: Batsman or Bowler
    average = models.FloatField()  # Average score of the player
    photograph = models.ImageField(upload_to='player_photos/', blank=True, null=True)  # Photo of the player

    def __str__(self):
        return f"{self.player_name} - {self.role} ({self.team})"
