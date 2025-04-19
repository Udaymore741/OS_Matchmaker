import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
    // Check for existing session in localStorage and cookies
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/getData", {
          credentials: "include"
        });
        const data = await response.json();
        
        if (data.success) {
          setUser(data.user);
          setUserProfile(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (data) => {
    if (!data) return;
    
    if (data.isLoading !== undefined) {
      setIsLoading(data.isLoading);
      return;
    }

    setIsLoading(true);
    try {
      if (data.user) {
        setUser(data.user);
        setUserProfile(data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Call logout endpoint to clear cookies
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Clear auth state
      setUser(null);
      setUserProfile(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
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