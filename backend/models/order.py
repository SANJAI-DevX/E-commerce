"""
Order Models
"""

from ..database import db
from datetime import datetime
from typing import Dict, Any, List
from enum import Enum

class OrderStatus(Enum):
    """Order status enumeration"""
    PENDING = 'pending'
    PROCESSING = 'processing'
    SHIPPED = 'shipped'
    DELIVERED = 'delivered'
    CANCELLED = 'cancelled'

class Order(db.Model):
    """Order model for customer orders"""
    
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default=OrderStatus.PENDING.value)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    items = db.relationship('OrderItem', backref='order', lazy=True, cascade='all, delete-orphan')
    
    def calculate_total(self) -> float:
        """Calculate total order amount"""
        return sum(item.price * item.quantity for item in self.items)
    
    def update_status(self, new_status: OrderStatus) -> None:
        """Update order status"""
        self.status = new_status.value
        self.updated_at = datetime.utcnow()
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert order to dictionary"""
        return {
            'id': str(self.id),
            'userId': str(self.user_id),
            'total': self.total,
            'status': self.status,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat(),
            'items': [item.to_dict() for item in self.items]
        }
    
    def __repr__(self) -> str:
        return f'<Order {self.id}>'

class OrderItem(db.Model):
    """Order item model for individual items in an order"""
    
    __tablename__ = 'order_items'
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    
    def get_subtotal(self) -> float:
        """Calculate subtotal for this item"""
        return self.price * self.quantity
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert order item to dictionary"""
        return {
            'id': self.id,
            'productId': str(self.product_id),
            'quantity': self.quantity,
            'price': self.price,
            'subtotal': self.get_subtotal(),
            'product': self.product.to_dict() if self.product else None
        }
    
    def __repr__(self) -> str:
        return f'<OrderItem {self.id}>'