import os
from flask import Flask
from .routes import api
from firebase_admin import credentials, initialize_app, storage

def create_app():
    app = Flask(__name__)
    app.register_blueprint(api)

    base_dir = os.path.abspath(os.path.dirname(__file__))  # Directory of __init__.py
    cred_path = os.path.join(base_dir, '../credentials.json')
    cred = credentials.Certificate(cred_path)
    initialize_app(cred, {
        'storageBucket': 'drip-48e2d.firebasestorage.app'
    })

    app.storage_bucket = storage.bucket()

    return app