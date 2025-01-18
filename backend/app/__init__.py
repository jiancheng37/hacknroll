import os
from flask_cors import CORS
from flask import Flask
from dotenv import load_dotenv
from .routes import api
from firebase_admin import credentials, initialize_app, storage

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(api)

    # Load environment variables from .env file
    load_dotenv()

    cred_path = os.getenv('FIREBASE_CRED_PATH')
    storage_bucket = os.getenv('FIREBASE_STORAGE_BUCKET')

    # Initialize Firebase Admin SDK
    cred = credentials.Certificate(cred_path)
    initialize_app(cred, {
        'storageBucket': storage_bucket
    })

    app.storage_bucket = storage.bucket()

    return app
