import os
from flask_cors import CORS
from flask import Flask
from firebase_admin import credentials, initialize_app, storage
from dotenv import load_dotenv
from .routes import api, init_vision_service

def create_app():
    # Load environment variables
    load_dotenv()
    
    app = Flask(__name__)
    CORS(app)
    # Load configuration
    from config import Config
    app.config.from_object(Config)
    
    # Check for credentials
    if not os.path.exists(app.config['GOOGLE_APPLICATION_CREDENTIALS']):
        raise RuntimeError("Google Cloud credentials not found")
        
    if not os.path.exists(app.config['FIREBASE_ADMIN_CREDENTIALS']):
        raise RuntimeError("Firebase Admin credentials not found")
    
    # Initialize Firebase with admin credentials
    cred = credentials.Certificate(app.config['FIREBASE_ADMIN_CREDENTIALS'])
    initialize_app(cred, {
        'storageBucket': app.config['FIREBASE_STORAGE_BUCKET']
    })
    
    # Set up storage bucket
    app.storage_bucket = storage.bucket()
    
    # Register blueprint
    app.register_blueprint(api)
    
    # Initialize vision service within app context
    with app.app_context():
        init_vision_service(app)
    
    return app
