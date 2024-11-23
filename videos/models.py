from django.db import models

class TrainingVideo(models.Model):
    title = models.CharField(max_length=200)
    video_file = models.FileField(upload_to='training_videos/')
    created_at = models.DateTimeField(auto_now_add=True)
    feedback = models.JSONField(default=dict)

    def __str__(self):
        return self.title