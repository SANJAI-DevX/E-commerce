import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CartModal } from './components/CartModal';
import { ProductModal } from './components/ProductModal';
import { AuthModal } from './components/AuthModal';
import { OrdersModal } from './components/OrdersModal';
import { AuthProvider } from './hooks/useAuth';
import { useCart } from './hooks/useCart';
import { Product } from './types';
import { mockProducts } from './data/mockProducts';
import { apiService } from './services/api';

function AppContent() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  const { addToCart, clearCart } = useCart();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check for existing auth token
        const token = localStorage.getItem('auth_token');
        if (token) {
          try {
            const userProfile = await apiService.getProfile();
            setUser(userProfile);
          } catch (error) {
            localStorage.removeItem('auth_token');
          }
        }

        // Load products from API or use mock data
        try {
          const productsData = await apiService.getProducts();
          setProducts(productsData);
          setFilteredProducts(productsData);
        } catch (error) {
          console.log('Using mock data - backend not available');
          setProducts(mockProducts);
          setFilteredProducts(mockProducts);
        }
      } catch (error) {
        console.error('App initialization error:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { user: userData, token } = await apiService.login(email, password);
      localStorage.setItem('auth_token', token);
      setUser(userData);
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    try {
      const { user: userData, token } = await apiService.register(email, password, name);
      localStorage.setItem('auth_token', token);
      setUser(userData);
    } catch (error) {
      throw new Error('Registration failed. Email may already be in use.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    clearCart();
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCheckout = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      if (cartItems.length === 0) return;

      await apiService.createOrder(cartItems);
      clearCart();
      setIsCartOpen(false);
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onSearchChange={handleSearchChange}
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onViewOrders={() => setIsOrdersModalOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-lg p-8 mb-8 text-white relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 animate-slide-up">
              {user ? `Welcome back, ${user.name}!` : 'Discover Amazing Products'}
            </h1>
            <p className="text-xl mb-6 animate-slide-up animation-delay-200">
              Find everything you need with our curated collection of premium products
            </p>
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-slide-up animation-delay-400">
              Shop Now
            </button>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-white bg-opacity-20 rounded-full animate-float"></div>
          <div className="absolute bottom-4 right-20 w-12 h-12 bg-white bg-opacity-15 rounded-full animate-float animation-delay-1000"></div>
          <div className="absolute top-1/2 right-8 w-8 h-8 bg-white bg-opacity-25 rounded-full animate-float animation-delay-500"></div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 animate-fade-in animation-delay-600">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 animate-slide-up ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md'
                }`}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${800 + index * 100}ms` }}
            >
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onProductClick={handleProductClick}
              />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg mb-4">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <OrdersModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;