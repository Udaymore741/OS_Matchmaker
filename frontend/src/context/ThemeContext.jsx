import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getInitialTheme, setTheme, toggleTheme as toggleThemeUtil } from '../utils/theme';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getInitialTheme());

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = toggleThemeUtil();
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme }; 