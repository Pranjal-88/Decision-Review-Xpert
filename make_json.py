import base64
import json

def create_request_body(image_path):
    """
    Creates a JSON request body with base64 encoded image for testing the pose API
    """
    # Read and encode the image
    with open(image_path, 'rb') as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        
    # Create the request body
    request_body = {
        "frame": f"data:image/jpeg;base64,{encoded_string}"
    }
    
    # Save to a file for easy copying
    with open('request_body.json', 'w') as f:
        json.dump(request_body, f)
    
    print("Request body has been saved to 'request_body.json'")
    
# Usage
image_path = r"C:\Users\HP\OneDrive\Desktop\gay.jpeg"  # Replace with your image path
create_request_body(image_path)