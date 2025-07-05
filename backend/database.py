"""
Database Configuration and Initialization
"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_database(app):
    """Initialize database with app context"""
    with app.app_context():
        db.create_all()
        
        # Import models to ensure they're registered
        from .models.user import User
        from .models.product import Product
        from .models.order import Order, OrderItem
        
        # Add sample products if none exist
        if not Product.query.first():
            sample_products = [
                Product(
                    name='Wireless Bluetooth Headphones',
                    description='Premium wireless headphones with active noise cancellation and 30-hour battery life.',
                    price=299.99,
                    image='https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
                    category='Electronics',
                    stock=15,
                    rating=4.8,
                    reviews=234
                ),
                Product(
                    name='Smart Watch Series 8',
                    description='Advanced smartwatch with health monitoring, GPS, and cellular connectivity.',
                    price=399.99,
                    image='https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500',
                    category='Electronics',
                    stock=8,
                    rating=4.6,
                    reviews=567
                ),
                Product(
                    name='Organic Cotton T-Shirt',
                    description='Comfortable and sustainable organic cotton t-shirt in various colors.',
                    price=29.99,
                    image='https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=500',
                    category='Clothing',
                    stock=25,
                    rating=4.4,
                    reviews=89
                ),
                Product(
                    name='Professional Camera Lens',
                    description='85mm f/1.4 portrait lens with exceptional image quality and bokeh.',
                    price=799.99,
                    image='https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
                    category='Electronics',
                    stock=5,
                    rating=4.9,
                    reviews=156
                ),
                Product(
                    name='Bestselling Novel',
                    description='Award-winning fiction novel that has captivated readers worldwide.',
                    price=14.99,
                    image='https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=500',
                    category='Books',
                    stock=50,
                    rating=4.7,
                    reviews=1234
                ),
                Product(
                    name='Yoga Mat Premium',
                    description='Non-slip yoga mat with superior grip and cushioning for all types of yoga.',
                    price=79.99,
                    image='https://images.pexels.com/photos/6740818/pexels-photo-6740818.jpeg?auto=compress&cs=tinysrgb&w=500',
                    category='Sports',
                    stock=18,
                    rating=4.5,
                    reviews=203
                ),
                Product(
                    name='Minimalist Desk Lamp',
                    description='Modern LED desk lamp with adjustable brightness and wireless charging base.',
                    price=149.99,
                    image='https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=500',
                    category='Home',
                    stock=12,
                    rating=4.3,
                    reviews=78
                ),
                Product(
                    name='Running Shoes Pro',
                    description='High-performance running shoes with advanced cushioning and breathable mesh.',
                    price=159.99,
                    image='https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500',
                    category='Sports',
                    stock=22,
                    rating=4.6,
                    reviews=445
                )
            ]
            
            for product in sample_products:
                db.session.add(product)
            
            db.session.commit()
            print("Sample products added to database")