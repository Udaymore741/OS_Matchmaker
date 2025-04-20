import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({
  user: null,
  userProfile: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session in localStorage and cookies
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/get-user", {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success) {
          setUser(data.user);
          setUserProfile(data.user);
          setIsAuthenticated(true);
          setError(null);
        } else {
          setError(data.message || 'Authentication failed');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setError(error.message);
        setIsAuthenticated(false);
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

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      
      if (responseData.success) {
        setUser(responseData.user);
        setUserProfile(responseData.user);
        setIsAuthenticated(true);
        setError(null);
        navigate('/profile');
      } else {
        setError(responseData.message || 'Login failed');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setUser(null);
        setUserProfile(null);
        setIsAuthenticated(false);
        setError(null);
        navigate('/login');
      } else {
        setError(data.message || 'Logout failed');
      }
    } catch (error) {
      console.error("Logout failed:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
      }}
    >
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