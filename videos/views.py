from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import cv2
import mediapipe as mp
import numpy as np
import base64

def calculate_angle(point1, point2, point3):
    a = np.array([point1.x, point1.y])
    b = np.array([point2.x, point2.y])
    c = np.array([point3.x, point3.y])
    
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    
    if angle > 180.0:
        angle = 360 - angle
        
    return angle

@api_view(['POST'])
def analyze_pose(request):
    try:
        # Get frame data from request
        frame_data = request.data.get('frame')
        frame_bytes = base64.b64decode(frame_data.split(',')[1])
        
        # Convert to numpy array
        nparr = np.frombuffer(frame_bytes, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Initialize MediaPipe
        mp_pose = mp.solutions.pose
        with mp_pose.Pose(
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5) as pose:

            # Process frame
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = pose.process(rgb_frame)
            
            feedback = {}
            if results.pose_landmarks:
                landmarks = results.pose_landmarks.landmark
                
                # Calculate elbow angle
                elbow_angle = calculate_angle(
                    landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value],
                    landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value],
                    landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value]
                )
                
                # Calculate knee angle
                knee_angle = calculate_angle(
                    landmarks[mp_pose.PoseLandmark.LEFT_HIP.value],
                    landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value],
                    landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value]
                )

                # Calculate head tilt angle (example: nose, shoulder, hip)
                head_tilt_angle = calculate_angle(
                    landmarks[mp_pose.PoseLandmark.NOSE.value],
                    landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value],
                    landmarks[mp_pose.PoseLandmark.LEFT_HIP.value]
                )

                # Provide feedback
                feedback = {
                    'elbow_angle': round(elbow_angle, 2),
                    'knee_angle': round(knee_angle, 2),
                    'head_tilt_angle': round(head_tilt_angle, 2)
                }

            return Response({
                'success': True,
                'feedback': feedback
            }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)
