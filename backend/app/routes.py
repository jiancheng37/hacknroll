from flask import Blueprint, request, jsonify, current_app, url_for
from firebase_admin import storage
import random
import requests

api = Blueprint('api', __name__)

@api.route('/')
def main():
    return "Main!"


@api.route('/upload', methods=['POST'])
def upload_image():
    # Get the uploaded image file
    image = request.files.get('image')
    if not image:
        return jsonify({"error": "No image uploaded"}), 400
    

    prediction = 'good'  # Assume 'bad' or 'good' is determined by some model

    try:
        # Call the audio endpoint with the predicted folder
        audio_url = url_for('api.audio', folder=prediction, _external=True)
        response = requests.get(audio_url)

        # Check the response from the audio endpoint
        if response.status_code == 200:
            sound_data = response.json()
            return jsonify({
                "classification": prediction,
                "sound_url": sound_data.get("url")
            })
        else:
            return jsonify({
                "classification": prediction,
                "error": "Failed to fetch sound",
                "details": response.json()
            }), response.status_code

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@api.route('/audio/<folder>', methods=['GET'])
def audio(folder):
    try:
        if folder not in ['good', 'bad']:
            return jsonify({"error": "Invalid folder. Use 'good' or 'bad'"}), 400

        bucket = current_app.storage_bucket

        folder_prefix = f"{folder}/"  # Adjust based on your bucket structure

        # List all blobs (files) in the folder
        blobs = bucket.list_blobs(prefix=folder_prefix)

        files = []
        for blob in blobs:
            if blob.size > 0:
                # Get the public access token link for the blob
                token_url = (
                    f"https://firebasestorage.googleapis.com/v0/b/{bucket.name}/o/"
                    f"{blob.name.replace('/', '%2F')}?alt=media&token={blob.metadata.get('firebaseStorageDownloadTokens')}"
                )
                files.append(token_url)

        if not files:
            return jsonify({"error": f"No files found in the '{folder}' folder"}), 404

        random_url = random.choice(files)

        return jsonify({"url": random_url})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
