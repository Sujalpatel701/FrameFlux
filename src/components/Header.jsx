// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import WallpaperTypes from './WallpaperTypes';
import './Header.css';

function Header({ toggleTheme, darkMode, onSelectType }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleUserClick = () => {
    navigate('/user');
  };

  const isHiddenPage =
    location.pathname === '/user' ||
    location.pathname === '/AddWallpaper' ||
    location.pathname === '/about' ||
    location.pathname.startsWith('/wallpaper/');

  return (
    <header className="header">
      <div className="header-top">
        <h1 className="logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            FrameFlux
          </Link>
        </h1>
        <div className="actions">
          {!isHiddenPage && (
            <>
              <button onClick={toggleTheme}>
                {darkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
              <button className="user-btn" onClick={handleUserClick}>👤</button>
            </>
          )}
        </div>
      </div>

      {!isHiddenPage && <WallpaperTypes onSelectType={onSelectType} />}
    </header>
  );
}

export default Header;
