from flask import Flask
from .routes import api
from firebase_admin import credentials, initialize_app

def create_app():
    app = Flask(__name__)
    app.register_blueprint(api)
    
    cred = credentials.Certificate('../credentials.json')  # Path to your Firebase key
    initialize_app(cred)
    app.firestore_db = firestore.client()

    return app