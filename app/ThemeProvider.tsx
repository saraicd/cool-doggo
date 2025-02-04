"use client";
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: any) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.style.setProperty('--background', '#ffffff');
      document.documentElement.style.setProperty('--foreground', '#171717');
    } else {
      document.documentElement.style.setProperty('--background', '#0a0a0a');
      document.documentElement.style.setProperty('--foreground', '#ededed');
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);