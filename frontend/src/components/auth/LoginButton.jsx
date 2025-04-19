import React from 'react';
import PropTypes from 'prop-types';
import { Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const LoginButton = ({ className = '' }) => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login();
    navigate('/');
  };

  return (
    <Button
      variant="primary"
      size="lg"
      onClick={handleLogin}
      isLoading={isLoading}
      leftIcon={<Github size={20} />}
      className={`font-medium ${className}`}
    >
      Sign in with GitHub
    </Button>
  );
};

LoginButton.propTypes = {
  className: PropTypes.string,
};

export default LoginButton; 