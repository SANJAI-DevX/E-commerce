import React, { useState } from 'react';
import { User, LogOut, ShoppingBag, Settings, ChevronDown } from 'lucide-react';
import { User as UserType } from '../types';

interface UserMenuProps {
  user: UserType;
  onLogout: () => void;
  onViewOrders: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout, onViewOrders }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 text-gray-700 hover:text-indigo-600 transition-all duration-300 transform hover:scale-105 rounded-lg hover:bg-gray-100"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="hidden md:block font-medium">{user.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-scale-in">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          
          <button
            onClick={() => {
              onViewOrders();
              setIsOpen(false);
            }}
            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300"
          >
            <ShoppingBag className="h-4 w-4 mr-3" />
            My Orders
          </button>
          
          <button
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300"
          >
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </button>
          
          <hr className="my-2" />
          
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-300"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};