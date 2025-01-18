from flask import Blueprint, request, jsonify
from firebase_admin import storage
import random

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

    # TODO: Add your outfit classification logic (good/bad)
    # For now, we'll classify randomly
    classification = random.choice(['good', 'bad'])

    # Fetch a random sound URL from Firebase Storage
    folder = f"{classification}/"
    bucket = storage.bucket()
    blobs = list(bucket.list_blobs(prefix=folder))
    sound_urls = [blob.public_url for blob in blobs if blob.name.endswith('.mp3')]

    if not sound_urls:
        return jsonify({"error": f"No sounds found in {folder}"}), 404

    selected_sound_url = random.choice(sound_urls)
    return jsonify({
        "classification": classification,
        "sound_url": selected_sound_url
    })