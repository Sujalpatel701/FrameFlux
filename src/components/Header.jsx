import React from 'react';
import { Link } from 'react-router-dom';
import WallpaperTypes from './WallpaperTypes';
import './Header.css';

function Header({ toggleTheme, darkMode }) {
  return (
    <header className="header">
      <div className="header-top">
        <h1 className="logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            FrameFlux
          </Link>
        </h1>
        <div className="actions">
          <button onClick={toggleTheme}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button className="user-btn">👤</button>
        </div>
      </div>

      <WallpaperTypes />
    </header>
  );
}

export default Header;
