"""
Orders API Routes
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.order import Order, OrderItem
from ..models.product import Product
from ..models.user import User
from ..database import db

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('', methods=['POST'])
@jwt_required()
def create_order():
    """Create a new order"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data or not data.get('items'):
            return jsonify({
                'success': False,
                'message': 'Order items are required'
            }), 400
        
        # Validate and calculate total
        total = 0
        order_items = []
        
        for item_data in data['items']:
            product = Product.query.get(item_data['product']['id'])
            if not product:
                return jsonify({
                    'success': False,
                    'message': f'Product not found: {item_data["product"]["id"]}'
                }), 404
            
            quantity = item_data['quantity']
            if not product.can_fulfill_order(quantity):
                return jsonify({
                    'success': False,
                    'message': f'Insufficient stock for {product.name}'
                }), 400
            
            item_total = product.price * quantity
            total += item_total
            
            order_items.append({
                'product_id': product.id,
                'quantity': quantity,
                'price': product.price
            })
        
        # Create order
        order = Order(user_id=user_id, total=total)
        db.session.add(order)
        db.session.flush()  # Get order ID
        
        # Create order items and update stock
        for item_data in order_items:
            order_item = OrderItem(
                order_id=order.id,
                product_id=item_data['product_id'],
                quantity=item_data['quantity'],
                price=item_data['price']
            )
            db.session.add(order_item)
            
            # Update product stock
            product = Product.query.get(item_data['product_id'])
            product.stock -= item_data['quantity']
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Order created successfully',
            'data': order.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': 'Failed to create order',
            'error': str(e)
        }), 500

@orders_bp.route('', methods=['GET'])
@jwt_required()
def get_orders():
    """Get user's orders"""
    try:
        user_id = get_jwt_identity()
        
        orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
        
        return jsonify({
            'success': True,
            'message': 'Orders retrieved successfully',
            'data': [order.to_dict() for order in orders]
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to retrieve orders',
            'error': str(e)
        }), 500

@orders_bp.route('/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order(order_id):
    """Get a specific order"""
    try:
        user_id = get_jwt_identity()
        
        order = Order.query.filter_by(id=order_id, user_id=user_id).first()
        
        if not order:
            return jsonify({
                'success': False,
                'message': 'Order not found'
            }), 404
        
        return jsonify({
            'success': True,
            'message': 'Order retrieved successfully',
            'data': order.to_dict()
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to retrieve order',
            'error': str(e)
        }), 500