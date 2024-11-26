from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
import mediapipe as mp
from PIL import Image
import io
import logging

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG)

# Initialize MediaPipe Pose with better detection settings
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(
    static_image_mode=False,
    model_complexity=2,  # Increased complexity for better accuracy
    enable_segmentation=True,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.7
)
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

def calculate_angle(point1, point2, point3):
    """Calculate angle between three points with additional validation."""
    try:
        if not all(hasattr(p, 'visibility') and p.visibility > 0.5 for p in [point1, point2, point3]):
            return None

        a = np.array([point1.x, point1.y])
        b = np.array([point2.x, point2.y])
        c = np.array([point3.x, point3.y])
        
        ba = a - b
        bc = c - b
        
        cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
        cosine_angle = np.clip(cosine_angle, -1.0, 1.0)  # Prevent domain errors
        angle = np.degrees(np.arccos(cosine_angle))
        
        return float(angle)
    except Exception as e:
        logging.error(f"Error calculating angle: {str(e)}")
        return None

def base64_to_image(base64_string):
    """Convert base64 string to OpenCV image with validation."""
    try:
        if 'data:image/' in base64_string:
            base64_string = base64_string.split(',')[1]
        
        image_bytes = base64.b64decode(base64_string)
        image_array = np.frombuffer(image_bytes, dtype=np.uint8)
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        
        if image is None:
            raise ValueError("Failed to decode image")
            
        return image
    except Exception as e:
        logging.error(f"Error converting base64 to image: {str(e)}")
        raise

def image_to_base64(image):
    """Convert OpenCV image to base64 string with compression."""
    try:
        encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 80]  # Reduced quality for faster transmission
        _, buffer = cv2.imencode('.jpg', image, encode_param)
        base64_string = base64.b64encode(buffer).decode('utf-8')
        return f'data:image/jpeg;base64,{base64_string}'
    except Exception as e:
        logging.error(f"Error converting image to base64: {str(e)}")
        raise

@app.route('/api/analyze-pose/', methods=['POST'])
def analyze_pose():
    try:
        data = request.json
        frame_base64 = data.get('frame')
        
        if not frame_base64:
            return jsonify({'success': False, 'error': 'No frame data provided'})
        
        # Convert base64 to image
        frame = base64_to_image(frame_base64)
        
        # Ensure proper image size
        frame = cv2.resize(frame, (640, 480))
        
        # Convert BGR to RGB
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Process the frame
        results = pose.process(frame_rgb)
        
        if not results.pose_landmarks:
            return jsonify({
                'success': True,  # Still return success, just with null values
                'annotated_frame': frame_base64,  # Return original frame
                'feedback': {
                    'elbow_angle': None,
                    'knee_angle': None,
                    'head_angle': None
                }
            })
        
        # Draw landmarks on frame
        annotated_frame = cv2.cvtColor(frame_rgb, cv2.COLOR_RGB2BGR)
        mp_drawing.draw_landmarks(
            annotated_frame,
            results.pose_landmarks,
            mp_pose.POSE_CONNECTIONS,
            landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style()
        )
        
        # Calculate angles
        landmarks = results.pose_landmarks.landmark
        
        # Elbow angle (using left arm)
        elbow_angle = calculate_angle(
            landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value],
            landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value],
            landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value]
        )
        
        # Knee angle (using left leg)
        knee_angle = calculate_angle(
            landmarks[mp_pose.PoseLandmark.LEFT_HIP.value],
            landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value],
            landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value]
        )
        
        # Head position (angle between shoulder, ear, and hip)
        head_angle = calculate_angle(
            landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value],
            landmarks[mp_pose.PoseLandmark.LEFT_EAR.value],
            landmarks[mp_pose.PoseLandmark.LEFT_HIP.value]
        )
        
        # Convert annotated frame to base64
        annotated_frame_base64 = image_to_base64(annotated_frame)
        
        return jsonify({
            'success': True,
            'annotated_frame': annotated_frame_base64,
            'feedback': {
                'elbow_angle': elbow_angle,
                'knee_angle': knee_angle,
                'head_angle': head_angle
            }
        })
    
    except Exception as e:
        logging.error(f"Error processing frame: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=7200)
