"""
Product Model
"""

from ..database import db
from datetime import datetime
from typing import Dict, Any

class Product(db.Model):
    """Product model for e-commerce items"""
    
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(255), nullable=True)
    category = db.Column(db.String(100), nullable=False)
    stock = db.Column(db.Integer, default=0)
    rating = db.Column(db.Float, default=0.0)
    reviews = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    order_items = db.relationship('OrderItem', backref='product', lazy=True)
    
    def is_in_stock(self) -> bool:
        """Check if product is in stock"""
        return self.stock > 0
    
    def can_fulfill_order(self, quantity: int) -> bool:
        """Check if product can fulfill order quantity"""
        return self.stock >= quantity
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert product to dictionary"""
        return {
            'id': str(self.id),
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'image': self.image,
            'category': self.category,
            'stock': self.stock,
            'rating': self.rating,
            'reviews': self.reviews,
            'created_at': self.created_at.isoformat()
        }
    
    def __repr__(self) -> str:
        return f'<Product {self.name}>'