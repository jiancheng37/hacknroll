import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    GOOGLE_CLOUD_PROJECT = os.getenv('GOOGLE_CLOUD_PROJECT')
    FIREBASE_STORAGE_BUCKET = os.getenv('FIREBASE_STORAGE_BUCKET')
    GOOGLE_APPLICATION_CREDENTIALS = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
    FIREBASE_ADMIN_CREDENTIALS = os.getenv('FIREBASE_ADMIN_CREDENTIALS')
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'heic'}
    # MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size