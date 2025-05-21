import React from 'react';
import { Link } from 'react-router-dom';

function WallpaperCard({ imageUrl, id }) {
  return (
    <div className="wallpaper-card">
      <Link to={`/wallpaper/${id}`}>
        <img
          src={imageUrl}
          alt="Wallpaper"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '10px',
            objectFit: 'cover',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        />
      </Link>
    </div>
  );
}

export default WallpaperCard;
