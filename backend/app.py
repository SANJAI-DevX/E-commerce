"""
E-Commerce Backend API
Flask application with SQLAlchemy ORM and JWT authentication
"""

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta
import os

from .config.config import config
from .database import db, init_database
from .api import register_blueprints

def create_app(config_name='development'):
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    jwt = JWTManager(app)
    CORS(app, origins=app.config['CORS_ORIGINS'])
    
    # Register API blueprints
    register_blueprints(app)
    
    # Initialize database
    init_database(app)
    
    return app

# Create app instance
app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=8000)