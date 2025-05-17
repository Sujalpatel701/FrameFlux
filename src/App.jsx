import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import './App.css';

function App() {
  // Initialize from localStorage, fallback to false
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // Update localStorage whenever darkMode changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`home ${darkMode ? 'dark' : 'light'}`}>
      <Home toggleTheme={toggleTheme} darkMode={darkMode} />
    </div>
  );
}

export default App;
