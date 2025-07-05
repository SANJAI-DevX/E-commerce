# EliteShop - Full-Stack E-Commerce Application

A modern, production-ready e-commerce web application built with React, TypeScript, and Python Flask.

## Features

### Frontend (React + TypeScript)
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Product Catalog**: Browse products with filtering and search
- **Shopping Cart**: Add/remove items with quantity management
- **User Authentication**: Login and registration system
- **Product Details**: Modal views with detailed product information
- **Mobile Responsive**: Optimized for all device sizes

### Backend (Python Flask)
- **RESTful API**: Clean API endpoints for all operations
- **JWT Authentication**: Secure user authentication
- **Database Integration**: SQLite/PostgreSQL support
- **Order Management**: Complete order processing system
- **Product Management**: CRUD operations for products

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Custom hooks for state management

### Backend
- Python Flask framework
- SQLAlchemy ORM
- JWT for authentication
- Flask-CORS for cross-origin support
- SQLite (development) / PostgreSQL (production)

## Project Structure

```
├── src/                          # Frontend source code
│   ├── components/              # React components
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CartModal.tsx
│   │   └── ProductModal.tsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useCart.ts
│   ├── services/               # API services
│   │   └── api.ts
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts
│   ├── data/                   # Mock data
│   │   └── mockProducts.ts
│   └── App.tsx                 # Main React component
├── backend/                    # Backend source code
│   ├── app.py                  # Main Flask application
│   ├── config/                 # Configuration files
│   │   └── config.py
│   ├── models/                 # Database models
│   │   ├── user.py
│   │   ├── product.py
│   │   └── order.py
│   ├── api/                    # API route handlers
│   │   ├── auth.py
│   │   ├── products.py
│   │   └── orders.py
│   ├── database/               # Database schema
│   │   └── schema.sql
│   └── requirements.txt        # Python dependencies
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/{id}` - Get specific product
- `GET /api/products/categories` - Get all categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/{id}` - Get specific order

## Getting Started

### Frontend Development
The React development server is already running. The frontend includes:
- Product catalog with search and filtering
- Shopping cart functionality
- Responsive design
- Mock data for development

### Backend Setup
To run the Python backend:

1. Install dependencies:
```bash
pip install -r backend/requirements.txt
```

2. Run the Flask application:
```bash
cd backend
python app.py
```

The backend will run on `http://localhost:8000`

### Database Setup
The application uses SQLite for development. The database schema is defined in `backend/database/schema.sql` and includes:
- Users table for authentication
- Products table for inventory
- Orders and OrderItems tables for order management

## Key Features

### Product Management
- Dynamic product catalog
- Category-based filtering
- Search functionality
- Stock management
- Rating and review system

### Shopping Cart
- Add/remove items
- Quantity management
- Persistent cart storage
- Real-time total calculation

### User Authentication
- JWT-based authentication
- Secure password hashing
- Protected routes
- User profile management

### Order Processing
- Complete checkout flow
- Order history
- Stock validation
- Order status tracking

## Design Highlights

- **Premium UI**: Clean, modern design with attention to detail
- **Responsive Layout**: Mobile-first approach with breakpoints
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Performance**: Optimized loading and efficient state management

## Production Considerations

- Environment-based configuration
- Database connection pooling
- API rate limiting
- Error handling and logging
- Security best practices
- Docker containerization ready

This application demonstrates a complete e-commerce solution with modern web development practices, clean architecture, and production-ready features.