import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className={`min-h-screen flex flex-col ${isLandingPage ? 'bg-transparent' : 'bg-gray-50 dark:bg-gray-900'}`}>
      <Navbar />
      <main className={`flex-1 ${isLandingPage ? 'w-full' : 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'}`}>
        {children}
      </main>
      {!isLandingPage && (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Open Source Contribution Matchmaker. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout; 