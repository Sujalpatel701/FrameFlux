import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import WallpaperTypes from './WallpaperTypes';
import './Header.css';

function Header({ toggleTheme, darkMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleUserClick = () => {
    navigate('/user');
  };

  // Add logic to hide on specific paths including dynamic wallpaper detail page
  const isHiddenPage =
    location.pathname === '/user' ||
    location.pathname === '/AddWallpaper' ||
    location.pathname.startsWith('/wallpaper/'); // ✅ dynamic route check

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

      {!isHiddenPage && <WallpaperTypes />}
    </header>
  );
}

export default Header;
