import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          // Validate token and get user info
          const userProfile = await apiService.getProfile();
          setUser(userProfile);
        } catch (error) {
          // Token is invalid, remove it
          localStorage.removeItem('auth_token');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user: userData, token } = await apiService.login(email, password);
      localStorage.setItem('auth_token', token);
      setUser(userData);
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const { user: userData, token } = await apiService.register(email, password, name);
      localStorage.setItem('auth_token', token);
      setUser(userData);
    } catch (error) {
      throw new Error('Registration failed. Email may already be in use.');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  // return (
  //   // <AuthContext.Provider value={value}>
  //   //   {children}
  //   // </AuthContext.Provider>

  // );
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Validate token and get user info
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user: userData, token } = await apiService.login(email, password);
      localStorage.setItem('auth_token', token);
      setUser(userData);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const { user: userData, token } = await apiService.register(email, password, name);
      localStorage.setItem('auth_token', token);
      setUser(userData);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };
};