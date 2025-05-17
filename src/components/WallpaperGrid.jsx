import React from 'react';
import WallpaperCard from './WallpaperCard';
import AddWallpaperButton from './AddWallpaperButton'; // Import the button
import './WallpaperGrid.css';

function WallpaperGrid({ onAddWallpaper }) {
  const numImages = 20;
  const wallpapers = Array.from({ length: numImages });

  return (
    <div className="wallpaper-grid-container">
      <div className="wallpaper-grid">
        {wallpapers.map((_, index) => (
          <WallpaperCard key={index} />
        ))}
      </div>
      <AddWallpaperButton onClick={onAddWallpaper} />
    </div>
  );
}

export default WallpaperGrid;
