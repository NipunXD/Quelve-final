import React, { useEffect, useState } from 'react';
import { Button } from './button'; // Ensure this import matches your Button component path
import { Sun, Moon } from 'lucide-react'; // Ensure these imports match your icon components path

const ThemeToggleButton = () => {
  const [isDark, setIsDark] = useState(false); // Default to false initially

  useEffect(() => {
    // Check and apply the theme preference from localStorage when component mounts
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    // Save the new theme preference to localStorage, ensuring this code runs only on the client side
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    }
  };

  return (
    <Button onClick={toggleTheme} className="flex items-center justify-center p-2 rounded-md bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
      {isDark ? (
        <Moon className="h-6 w-6 text-gray-800 dark:text-gray-200 transition-transform duration-500" />
      ) : (
        <Sun className="h-6 w-6 text-gray-800 dark:text-gray-200 transition-transform duration-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggleButton;