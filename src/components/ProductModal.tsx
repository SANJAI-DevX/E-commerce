import React, { useState } from 'react';
import { X, Star, ShoppingCart, Plus, Minus, Heart, Share2 } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (!isOpen || !product) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 transition-all duration-200 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onAddToCart(product, quantity);
    setIsAddingToCart(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <h2 className="text-xl font-semibold">Product Details</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-300 transform hover:scale-110"
            >
              <Heart className={`h-5 w-5 transition-all duration-300 ${
                isLiked ? 'text-red-300 fill-current' : 'text-white'
              }`} />
            </button>
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-300 transform hover:scale-110">
              <Share2 className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-90"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="animate-slide-in-left">
              <div className="relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-lg"></div>
              </div>
            </div>
            
            <div className="animate-slide-in-right">
              <h1 className="text-3xl font-bold text-gray-800 mb-3 hover:text-indigo-600 transition-colors duration-300">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600 text-sm ml-2">
                  ({product.reviews} reviews)
                </span>
              </div>
              
              <p className="text-4xl font-bold text-indigo-600 mb-6 animate-pulse">
                ${product.price.toFixed(2)}
              </p>
              
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  <span className="text-sm text-gray-500">Category</span>
                  <p className="font-medium">{product.category}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  <span className="text-sm text-gray-500">Stock</span>
                  <p className={`font-medium ${
                    product.stock > 10 ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {product.stock} available
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mb-8">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-200 rounded-full transition-all duration-300 transform hover:scale-110"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 hover:bg-gray-200 rounded-full transition-all duration-300 transform hover:scale-110"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAddingToCart}
                className={`w-full flex items-center justify-center px-6 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : isAddingToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg'
                }`}
              >
                <ShoppingCart className={`h-5 w-5 mr-2 ${isAddingToCart ? 'animate-spin' : ''}`} />
                {product.stock === 0 
                  ? 'Out of Stock' 
                  : isAddingToCart 
                  ? 'Adding to Cart...' 
                  : 'Add to Cart'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};