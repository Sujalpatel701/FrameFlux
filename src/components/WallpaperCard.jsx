import React from 'react';
import { Link } from 'react-router-dom';

function WallpaperCard({ imageUrl, id, small }) {
  return (
    <div className={`wallpaper-card ${small ? 'small' : ''}`}>
      <Link to={`/wallpaper/${id}`}>
        <img
          src={imageUrl}
          alt="Wallpaper"
          style={{
            width: small ? '160px' : '100%',
            height: 'auto',
            borderRadius: '10px',
            objectFit: 'cover',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'transform 0.2s ease-in-out',
          }}
        />
      </Link>
    </div>
  );
}

export default WallpaperCard;
