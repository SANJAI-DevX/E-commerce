import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { UserMenu } from './UserMenu';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  onSearchChange: (query: string) => void;
  onCartClick: () => void;
  onAuthClick: () => void;
  onLogout: () => void;
  onViewOrders: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  onSearchChange, 
  onCartClick, 
  onAuthClick, 
  onLogout, 
  onViewOrders 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getItemCount } = useCart();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 animate-fade-in">
              <h1 className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer">
                EliteShop
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {categories.map((category, index) => (
                  <a
                    key={category}
                    href="#"
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-indigo-50 transform hover:scale-105 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {category}
                  </a>
                ))}
              </div>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block animate-fade-in animation-delay-300">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300"
                placeholder="Search products..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 animate-fade-in animation-delay-500">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110 group"
            >
              <ShoppingCart className="h-6 w-6 group-hover:animate-bounce" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {getItemCount()}
                </span>
              )}
            </button>

            {user ? (
              <UserMenu
                user={user}
                onLogout={onLogout}
                onViewOrders={onViewOrders}
              />
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:block">Sign In</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 animate-spin" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'max-h-96 opacity-100 transform translate-y-0' 
            : 'max-h-0 opacity-0 transform -translate-y-4 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Mobile search */}
            <div className="relative mb-3 animate-slide-down">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                placeholder="Search products..."
              />
            </div>

            {/* Mobile categories */}
            {categories.map((category, index) => (
              <a
                key={category}
                href="#"
                className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-indigo-50 transform hover:translate-x-2 animate-slide-down"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {category}
              </a>
            ))}

            {/* Mobile auth */}
            {!user && (
              <button
                onClick={onAuthClick}
                className="w-full text-left px-3 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-md transition-colors"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};