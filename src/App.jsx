import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { IssueProvider } from './context/IssueContext';
import AuthGuard from './components/auth/AuthGuard';
import DashboardPage from './pages/DashboardPage';
import IssuesPage from './pages/IssuesPage';
import SavedIssuesPage from './pages/SavedIssuesPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import PropTypes from 'prop-types';

function App() {
  // Route guard for public routes (like landing page)
  const PublicRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
      return <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
    }
    
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }
    
    return children;
  };

  PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <IssueProvider>
            <Routes>
              {/* Public routes */}
              <Route 
                path="/" 
                element={
                  <PublicRoute>
                    <LandingPage />
                  </PublicRoute>
                } 
              />
              
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                } 
              />
              
              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <AuthGuard>
                    <DashboardPage />
                  </AuthGuard>
                }
              />
              
              <Route
                path="/issues"
                element={
                  <AuthGuard>
                    <IssuesPage />
                  </AuthGuard>
                }
              />
              
              <Route
                path="/saved"
                element={
                  <AuthGuard>
                    <SavedIssuesPage />
                  </AuthGuard>
                }
              />
              
              <Route
                path="/profile"
                element={
                  <AuthGuard>
                    <ProfilePage />
                  </AuthGuard>
                }
              />
              
              {/* Catch-all route - redirect to appropriate page based on auth status */}
              <Route 
                path="*" 
                element={
                  <Navigate 
                    to={localStorage.getItem('auth') ? '/dashboard' : '/'} 
                    replace 
                  />
                } 
              />
            </Routes>
          </IssueProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App; 