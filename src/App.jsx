import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';  // import your User page
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
      <Routes>
        <Route
          path="/FrameFlux/"
          element={<Home toggleTheme={toggleTheme} darkMode={darkMode} />}
        />
        <Route path="/FrameFlux/user" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
