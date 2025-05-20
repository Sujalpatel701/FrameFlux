import React from 'react';

function WallpaperCard({ imageUrl }) {
  return (
    <div className="wallpaper-card">
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
    </div>
  );
}

export default WallpaperCard;
