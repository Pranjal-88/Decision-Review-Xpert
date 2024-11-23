from django.db import models

class Player(models.Model):
    ROLE_CHOICES = [
        ('Batsman', 'Batsman'),
        ('Bowler', 'Bowler'),
    ]

    player_id = models.AutoField(primary_key=True)  
    player_name = models.CharField(max_length=100)  
    age = models.IntegerField()  
    team = models.CharField(max_length=100)  
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)  
    average = models.FloatField()  # Average score of the player
    photograph = models.ImageField(upload_to='player_photos/', blank=True, null=True)  

    def __str__(self):
        return f"{self.player_name} - {self.role} ({self.team})"
    

class Match(models.Model):
    TEAM_FORMAT_CHOICES = [
        ('T20', 'T20'),
        ('ODI', 'ODI'),
        ('Test', 'Test'),
    ]

    id = models.AutoField(primary_key=True)
    team_name = models.CharField(max_length=100, verbose_name="Team Name")
    format = models.CharField(max_length=10, choices=TEAM_FORMAT_CHOICES, verbose_name="Match Format")
    team_logo = models.ImageField(upload_to='team_logos/', blank=True, null=True)
    date = models.DateField(verbose_name="Match Date")
    time = models.TimeField(verbose_name="Match Time")
    venue = models.CharField(max_length=200, verbose_name="Match Venue")

    def __str__(self):
        return f"{self.team_name} ({self.format}) - {self.date}"

    class Meta:
        ordering = ['date', 'time']
        verbose_name = "Match"
        verbose_name_plural = "Matches"

class Training(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="trainings")
    date=models.DateField()
    time = models.TimeField()  
    remark = models.TextField(blank=True, null=True)  

    def __str__(self):
        return f"Training for {self.player.player_name} at {self.time}"
    
    class Meta:
        ordering = ['date', 'time']
