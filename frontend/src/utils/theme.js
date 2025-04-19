const getInitialTheme = () => {
  // Check for saved theme preference in localStorage
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    return savedTheme;
  }
  
  // Check for system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

const setTheme = (theme) => {
  const root = window.document.documentElement;
  
  // Remove both classes and add the current theme
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  
  // Store the preference
  localStorage.setItem('theme', theme);
};

const toggleTheme = () => {
  const currentTheme = localStorage.getItem('theme') || 
    (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  return newTheme;
};

export { getInitialTheme, setTheme, toggleTheme }; 