import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div className={`home ${darkMode ? 'dark' : 'light'}`}>
      <Routes>
        <Route path="/" element={<Home toggleTheme={toggleTheme} darkMode={darkMode} />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
