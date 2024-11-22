import cv2
import mediapipe as mp
import numpy as np
import time
import random

def create_confetti(frame, num_particles=50):

    height, width = frame.shape[:2]
    for _ in range(num_particles):
        x = random.randint(0, width)
        y = random.randint(0, height)
        size = random.randint(5, 15)
        color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
        cv2.circle(frame, (x, y), size, color, -1)

def calculate_angle(point1, point2, point3):

    a = np.array(point1)
    b = np.array(point2)
    c = np.array(point3)

    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)

    if angle > 180.0:
        angle = 360 - angle

    return angle

def draw_text_with_background(frame, text, position, font_scale, color, thickness, bg_color, padding=10, alpha=0.7):

    font = cv2.FONT_HERSHEY_SIMPLEX
    text_size = cv2.getTextSize(text, font, font_scale, thickness)[0]
    text_x, text_y = position
    

    box_coords = ((text_x, text_y - text_size[1] - padding), 
                 (text_x + text_size[0] + padding * 2, text_y + padding))
    

    overlay = frame.copy()
    cv2.rectangle(overlay, box_coords[0], box_coords[1], bg_color, cv2.FILLED)
    cv2.addWeighted(overlay, alpha, frame, 1 - alpha, 0, frame)
    

    cv2.putText(frame, text, (text_x + padding, text_y), font, 
                font_scale, color, thickness, cv2.LINE_AA)

def create_instruction_overlay(frame, text, position):

    height, width = frame.shape[:2]
    overlay = frame.copy()
    

    cv2.rectangle(overlay, (0, position[1]-100), (width, position[1]+50), 
                 (0, 0, 0), cv2.FILLED)
    cv2.addWeighted(overlay, 0.7, frame, 0.3, 0, frame)
    

    cv2.putText(frame, text, position, cv2.FONT_HERSHEY_DUPLEX, 
                1.5, (255, 255, 255), 2, cv2.LINE_AA)

def main():

    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose()
    mp_drawing = mp.solutions.drawing_utils


    target_ranges = {
        'knee': (150, 180),
        'elbow': (80, 120),
        'head_tilt': (0, 45),
    }


    cap = cv2.VideoCapture(2)
    

    window_name = 'DRX: Cover Drive Practice'
    cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
    cv2.resizeWindow(window_name, 1280, 720)  

    start_timer = None
    aligned = False
    success_animation = False
    success_start_time = None

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break


        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb_frame)


        header_height = 80
        cv2.rectangle(frame, (0, 0), (frame.shape[1], header_height), (40, 40, 40), cv2.FILLED)
        draw_text_with_background(frame, "DRX: Cover Drive Practice", 
                                (20, 50), 1.5, (255, 255, 255), 2, (40, 40, 40))


        if results.pose_landmarks:
            mp_drawing.draw_landmarks(
                frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=3, circle_radius=5),
                mp_drawing.DrawingSpec(color=(255, 255, 0), thickness=2, circle_radius=2)
            )

            landmarks = results.pose_landmarks.landmark


            shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                       landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
            elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                    landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
            wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                    landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
            hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
            knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
                   landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
            ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
                    landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]
            nose = [landmarks[mp_pose.PoseLandmark.NOSE.value].x,
                   landmarks[mp_pose.PoseLandmark.NOSE.value].y]


            elbow_angle = calculate_angle(shoulder, elbow, wrist)
            knee_angle = calculate_angle(hip, knee, ankle)
            head_tilt_angle = calculate_angle(shoulder, nose, hip)


            feedback = {
                'knee': 'Correct' if target_ranges['knee'][0] <= knee_angle <= target_ranges['knee'][1] 
                        else '⬆ Straighten your knee more' if knee_angle < target_ranges['knee'][0] 
                        else '⬇ Bend your knee slightly',
                'elbow': 'Correct' if target_ranges['elbow'][0] <= elbow_angle <= target_ranges['elbow'][1] 
                         else '⬆ Bend your elbow' if elbow_angle < target_ranges['elbow'][0] 
                         else '⬇ Bend your elbow',
                'head_tilt': 'Correct' if target_ranges['head_tilt'][0] <= head_tilt_angle <= target_ranges['head_tilt'][1] 
                            else '⬇ Lower your head' if head_tilt_angle < target_ranges['head_tilt'][0] 
                            else '⬆ Look up slightly'
            }


            aligned = all(value == 'Correct' for value in feedback.values())


            for i, (key, value) in enumerate(feedback.items()):
                color = (0, 255, 0) if value == 'Correct' else (0, 165, 255)
                draw_text_with_background(
                    frame, f"{key}: {value}", 
                    (20, header_height + 60 + i * 80), 
                    1.4, color, 2, (0, 0, 0)
                )


            if aligned and not success_animation:
                if start_timer is None:
                    start_timer = time.time()
                elapsed = int(time.time() - start_timer)
                remaining = max(0, 5 - elapsed)  # Changed to 10 seconds
                

                height, width = frame.shape[:2]
                timer_size = min(remaining * 20 + 100, 300)  # Pulsing effect
                draw_text_with_background(
                    frame, f"{remaining}s", 
                    (width//2 - timer_size//2, height//2), 
                    timer_size/100, (0, 255, 255), 3, (0, 0, 0)
                )
                
                if remaining <= 0:
                    success_animation = True
                    success_start_time = time.time()
                    start_timer = None
            else:
                start_timer = None


            if success_animation:
                if success_start_time is None:
                    success_start_time = time.time()
                
                if time.time() - success_start_time < 3:  # 3 seconds of celebration
                    create_confetti(frame)
                    height, width = frame.shape[:2]
                    celebration_text = "PERFECT FORM!"
                    font_scale = 3.0 + np.sin(time.time() * 10) * 0.3  # Pulsing effect
                    draw_text_with_background(
                        frame, celebration_text,
                        (width//2 - 300, height//2), 
                        font_scale, (0, 255, 255), 3, (0, 0, 0)
                    )
                else:
                    success_animation = False
                    success_start_time = None
                    
        cv2.imshow(window_name, frame)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()