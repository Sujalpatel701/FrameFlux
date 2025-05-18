import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import WallpaperTypes from './WallpaperTypes';
import './Header.css';

function Header({ toggleTheme, darkMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleUserClick = () => {
    navigate('/FrameFlux/user');
  };

  // Hide both WallpaperTypes and theme toggle on user page
  const isUserPage = location.pathname === '/FrameFlux/user';

  return (
    <header className="header">
      <div className="header-top">
        <h1 className="logo">
          <Link to="/FrameFlux/" style={{ textDecoration: 'none', color: 'inherit' }}>
            FrameFlux
          </Link>
        </h1>
        <div className="actions">
          {!isUserPage && (
            <button onClick={toggleTheme}>
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          )}
          <button className="user-btn" onClick={handleUserClick}>👤</button>
        </div>
      </div>

      {!isUserPage && <WallpaperTypes />}
    </header>
  );
}

export default Header;
