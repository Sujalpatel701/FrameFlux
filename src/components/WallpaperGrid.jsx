import React, { useEffect, useState } from 'react';
import WallpaperCard from './WallpaperCard';
import AddWallpaperButton from './AddWallpaperButton';
import './WallpaperGrid.css';

function WallpaperGrid({ onAddWallpaper }) {
  const [wallpapers, setWallpapers] = useState([]);

  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/wallpapers`);
        const data = await response.json();
        if (response.ok) {
          setWallpapers(data);
        } else {
          console.error("Failed to fetch wallpapers:", data.message);
        }
      } catch (error) {
        console.error("Error fetching wallpapers:", error);
      }
    };

    fetchWallpapers();
  }, []);

  return (
    <div className="wallpaper-grid-container">
      <div className="wallpaper-grid">
        {wallpapers.map((wallpaper) => (
          <WallpaperCard key={wallpaper._id} imageUrl={`${import.meta.env.VITE_API_BASE_URL}/uploads/${wallpaper.imageName}`} />
        ))}
      </div>
      <AddWallpaperButton onClick={onAddWallpaper} />
    </div>
  );
}

export default WallpaperGrid;
