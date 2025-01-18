# from flask import Blueprint, request, jsonify, current_app, url_for
# from firebase_admin import storage
# import random
# import requests

# api = Blueprint('api', __name__)

# @api.route('/')
# def main():
#     return "Main!"


# @api.route('/upload', methods=['POST'])
# def upload_image():
#     # Get the uploaded image file
#     image = request.files.get('image')
#     if not image:
#         return jsonify({"error": "No image uploaded"}), 400
    

#     prediction = 'bad'  # Assume 'bad' or 'good' is determined by some model

#     try:
#         # Call the audio endpoint with the predicted folder
#         audio_url = url_for('api.audio', folder=prediction, _external=True)
#         response = requests.get(audio_url)

#         # Check the response from the audio endpoint
#         if response.status_code == 200:
#             sound_data = response.json()
#             return jsonify({
#                 "classification": prediction,
#                 "sound_url": sound_data.get("url")
#             })
#         else:
#             return jsonify({
#                 "classification": prediction,
#                 "error": "Failed to fetch sound",
#                 "details": response.json()
#             }), response.status_code

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    
# @api.route('/audio/<folder>', methods=['GET'])
# def audio(folder):
#     try:
#         if folder not in ['good', 'bad']:
#             return jsonify({"error": "Invalid folder. Use 'good' or 'bad'"}), 400

#         bucket = current_app.storage_bucket

#         folder_prefix = f"{folder}/"  # Adjust based on your bucket structure

#         # List all blobs (files) in the folder
#         blobs = bucket.list_blobs(prefix=folder_prefix)

#         files = [blob.public_url for blob in blobs if blob.size > 0]

#         if not files:
#             return jsonify({"error": f"No files found in the '{folder}' folder"}), 404

#         random_url = random.choice(files)

#         return jsonify({"url": random_url})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

from flask import Blueprint, request, jsonify, current_app, url_for
from firebase_admin import storage
import random
import requests
from vision_service import VisionService
from werkzeug.utils import secure_filename
import os

api = Blueprint('api', __name__)
vision_service = None

def init_vision_service(app):
    global vision_service
    credentials_path = app.config.get('GOOGLE_APPLICATION_CREDENTIALS')
    vision_service = VisionService(credentials_path=credentials_path)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

@api.route('/')
def main():
    return "Fashion Rating API"

@api.route('/upload', methods=['POST'])
def upload_image():
    # Add debug logging
    print("Files in request:", request.files)
    print("Content Type:", request.content_type)
    
    if 'image' not in request.files:
        print("No image file in request")
        return jsonify({"error": "No image uploaded"}), 400
    
    image = request.files['image']
    print("Filename:", image.filename)
    print("Content Type:", image.content_type)
    
    # Check if file is valid
    if image.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if not allowed_file(image.filename):
        return jsonify({"error": "File type not allowed"}), 400

    try:
        # Analyze the outfit
        score, classification, details = vision_service.analyze_outfit(image)

        # Get appropriate audio
        audio_url = url_for('api.audio', folder=classification, _external=True)
        audio_response = requests.get(audio_url)

        if audio_response.status_code != 200:
            return jsonify({"error": "Failed to fetch audio"}), 500

        # Generate response message
        message = get_response_message(score)

        return jsonify({
            "score": score,
            "classification": classification,
            "message": message,
            "details": details,
            "sound_url": audio_response.json().get("url")
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/audio/<folder>', methods=['GET'])
def audio(folder):
    try:
        # Validate folder
        if folder not in ['good', 'bad']:
            return jsonify({"error": "Invalid folder. Use 'good' or 'bad'"}), 400

        bucket = current_app.storage_bucket
        folder_prefix = f"{folder}/"  # Adjust to match your folder structure

        # List blobs in the folder
        blobs = list(bucket.list_blobs(prefix=folder_prefix))
        
        # Filter out only .mp3 files
        audio_files = []
        for blob in blobs:
            if blob.size > 0:
                # Get the public access token link for the blob
                token_url = (
                    f"https://firebasestorage.googleapis.com/v0/b/{bucket.name}/o/"
                    f"{blob.name.replace('/', '%2F')}?alt=media&token={blob.metadata.get('firebaseStorageDownloadTokens')}"
                )
                audio_files.append(token_url)

        if not audio_files:
            return jsonify({"error": f"No files found in the '{folder}' folder"}), 404

        # Handle case where no audio files are found
        if not audio_files:
            return jsonify({"error": f"No audio files found in the '{folder}' folder"}), 404

        # Randomly select an audio file
        selected_audio = random.choice(audio_files)
        print(f"Selected audio file: {selected_audio}")

        return jsonify({"url": selected_audio})

    except Exception as e:
        print(f"Error in /audio/{folder}: {str(e)}")
        return jsonify({"error": str(e)}), 500

def get_response_message(score: int) -> str:
    if score >= 90:
        return 5
    elif score >= 80:
        return 4
    elif score >= 70:
        return 3
    elif score >= 50:
        return 2
    else:
        return 1
