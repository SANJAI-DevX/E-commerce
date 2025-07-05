"""
Products API Routes
"""

from flask import Blueprint, request, jsonify
from sqlalchemy import or_
from ..models.product import Product
from ..database import db

products_bp = Blueprint('products', __name__)

@products_bp.route('', methods=['GET'])
def get_products():
    """Get all products with optional filtering"""
    try:
        # Get query parameters
        category = request.args.get('category')
        search = request.args.get('search')
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 20))
        
        # Build query
        query = Product.query
        
        # Filter by category
        if category:
            query = query.filter(Product.category == category)
        
        # Filter by search term
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    Product.name.ilike(search_term),
                    Product.description.ilike(search_term)
                )
            )
        
        # Paginate results
        products = query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        return jsonify({
            'success': True,
            'message': 'Products retrieved successfully',
            'data': [product.to_dict() for product in products.items],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': products.total,
                'pages': products.pages
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to retrieve products',
            'error': str(e)
        }), 500

@products_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get a specific product"""
    try:
        product = Product.query.get(product_id)
        
        if not product:
            return jsonify({
                'success': False,
                'message': 'Product not found'
            }), 404
        
        return jsonify({
            'success': True,
            'message': 'Product retrieved successfully',
            'data': product.to_dict()
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to retrieve product',
            'error': str(e)
        }), 500

@products_bp.route('/categories', methods=['GET'])
def get_categories():
    """Get all product categories"""
    try:
        categories = db.session.query(Product.category).distinct().all()
        category_list = [category[0] for category in categories]
        
        return jsonify({
            'success': True,
            'message': 'Categories retrieved successfully',
            'data': category_list
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to retrieve categories',
            'error': str(e)
        }), 500