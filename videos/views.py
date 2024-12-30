from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import mediapipe as mp
import numpy as np
import cv2
import base64
from PIL import Image
import io

class PoseAnalysisView(APIView):
    def __init__(self):
        super().__init__()
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose(
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.mp_drawing = mp.solutions.drawing_utils

    def calculate_angle(self, a, b, c):
        a = np.array(a)
        b = np.array(b)
        c = np.array(c)

        radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
        angle = np.abs(radians * 180.0 / np.pi)
        return angle if angle <= 180 else 360 - angle

    def decode_base64_image(self, base64_string):
        image_data = base64.b64decode(base64_string.split(",")[1])
        image = Image.open(io.BytesIO(image_data))
        return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    def process_frame(self, frame):
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.pose.process(image)

        if not results.pose_landmarks:
            return None, None

        landmarks = results.pose_landmarks.landmark
        h, w, _ = frame.shape

        right_shoulder = [landmarks[self.mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x * w,
                          landmarks[self.mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y * h]
        right_elbow = [landmarks[self.mp_pose.PoseLandmark.RIGHT_ELBOW.value].x * w,
                       landmarks[self.mp_pose.PoseLandmark.RIGHT_ELBOW.value].y * h]
        right_wrist = [landmarks[self.mp_pose.PoseLandmark.RIGHT_WRIST.value].x * w,
                       landmarks[self.mp_pose.PoseLandmark.RIGHT_WRIST.value].y * h]

        elbow_angle = self.calculate_angle(right_shoulder, right_elbow, right_wrist)

        return {
            "elbow_angle": elbow_angle,
        }, results.pose_landmarks

    def post(self, request):
        frame_data = request.data.get("frame")
        if not frame_data:
            return Response({"success": False, "error": "No frame data provided"}, status=status.HTTP_400_BAD_REQUEST)

        frame = self.decode_base64_image(frame_data)
        feedback, pose_landmarks = self.process_frame(frame)

        if not feedback:
            return Response({"success": False, "error": "Pose not detected"}, status=status.HTTP_200_OK)

        annotated_frame = frame.copy()
        self.mp_drawing.draw_landmarks(annotated_frame, pose_landmarks, self.mp_pose.POSE_CONNECTIONS)
        _, buffer = cv2.imencode(".jpg", annotated_frame)
        annotated_base64 = base64.b64encode(buffer).decode("utf-8")

        return Response({
            "success": True,
            "feedback": feedback,
            "annotated_frame": f"data:image/jpeg;base64,{annotated_base64}"
        })
