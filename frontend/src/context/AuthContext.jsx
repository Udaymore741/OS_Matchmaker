import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { mockUser, mockUserProfile } from '../data/mockData';

const AuthContext = createContext({
  user: null,
  userProfile: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage (mock auth persistence)
    const checkAuth = async () => {
      const savedAuth = localStorage.getItem('auth');
      if (savedAuth) {
        setUser(mockUser);
        setUserProfile(mockUserProfile);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set auth state before storing in localStorage
      setUser(mockUser);
      setUserProfile(mockUserProfile);
      setIsAuthenticated(true);
      
      // Store auth state in localStorage
      localStorage.setItem('auth', 'true');
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    // Clear auth state
    setUser(null);
    setUserProfile(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth }; 