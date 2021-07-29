/* eslint-disable no-shadow */
import React from 'react';

const ThemeContext = React.createContext();

const ThemeProvider = (props) => {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const isDark = localStorage.getItem('isDark') === 'true';
    if (isDark) {
      document.querySelector('body').classList.add('dark');
    }
    setDark(isDark);
  }, []);

  const toggleTheme = () => {
    setDark((dark) => {
      const isDark = !dark;
      const body = document.querySelector('body');
      localStorage.setItem('isDark', JSON.stringify(isDark));
      if (isDark) {
        body.classList.add('dark');
      } else {
        body.classList.remove('dark');
      }
      return isDark;
    });
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ThemeContext.Provider value={{ dark, toggleTheme }} {...props} />;
};

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme };
