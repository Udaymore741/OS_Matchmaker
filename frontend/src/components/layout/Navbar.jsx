import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Github, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Issues', path: '/issues' },
    { name: 'Saved', path: '/saved' },
    { name: 'Profile', path: '/profile' },
  ];

  const handleSignUp = () => {
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <Github className="h-8 w-8 text-blue-600 dark:text-blue-500" />
                <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                  <span className="text-blue-600 dark:text-blue-500">OS</span>Matchmaker
                </span>
              </Link>
            </div>

            {/* Desktop navigation - Only show when authenticated */}
            {isAuthenticated && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                      isActive(link.path)
                        ? 'border-blue-600 dark:border-blue-500 text-gray-900 dark:text-white'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && <ThemeToggle />}

            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center gap-3">
                  <img
                    className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-700"
                    src={user.avatarUrl}
                    alt={user.name}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    leftIcon={<LogOut size={16} />}
                  >
                    Sign out
                  </Button>
                </div>

                {/* Mobile menu button */}
                <div className="flex items-center sm:hidden">
                  <button
                    onClick={toggleMenu}
                    className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  >
                    <span className="sr-only">Open main menu</span>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={handleSignUp}
                leftIcon={<Github size={16} />}
                className="font-medium"
              >
                Sign up with GitHub
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu - Only show when authenticated */}
      {isMenuOpen && isAuthenticated && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          {user && (
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-700"
                    src={user.avatarUrl}
                    alt={user.name}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 