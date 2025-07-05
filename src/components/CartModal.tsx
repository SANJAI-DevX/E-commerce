import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-90"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="animate-bounce mb-4">
                <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto" />
              </div>
              <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
              <div className="text-4xl animate-pulse">🛒</div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div 
                  key={item.product.id} 
                  className="flex items-center space-x-4 p-3 border rounded-lg hover:shadow-md transition-all duration-300 animate-slide-in-right"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded hover:scale-110 transition-transform duration-300"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">
                      {item.product.name}
                    </h3>
                    <p className="text-indigo-600 font-semibold">${item.product.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-all duration-300 transform hover:scale-110"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <span className="w-8 text-center font-semibold animate-pulse">{item.quantity}</span>
                    
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-all duration-300 transform hover:scale-110"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-all duration-300 transform hover:scale-110"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t bg-gray-50 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">
                Total: 
                <span className="text-indigo-600 ml-2 animate-pulse">
                  ${getCartTotal().toFixed(2)}
                </span>
              </span>
            </div>
            
            <button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <span className="flex items-center justify-center">
                Proceed to Checkout
                <span className="ml-2 animate-bounce">🚀</span>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};