"""
API Routes
"""

from .auth import auth_bp
from .products import products_bp
from .orders import orders_bp

def register_blueprints(app):
    """Register all API blueprints"""
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(products_bp, url_prefix='/api/products')
    app.register_blueprint(orders_bp, url_prefix='/api/orders')