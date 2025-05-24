import React, { useEffect, useState } from 'react';
import WallpaperCard from './WallpaperCard';
import AddWallpaperButton from './AddWallpaperButton';
import './WallpaperGrid.css';

function WallpaperGrid({ onAddWallpaper, filterType }) {
  const [allWallpapers, setAllWallpapers] = useState([]);
  const [filteredWallpapers, setFilteredWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWallpapers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/wallpapers`);
        const data = await response.json();
        if (response.ok) {
          setAllWallpapers(data);
        } else {
          console.error('Failed to fetch wallpapers:', data.message);
          setAllWallpapers([]);
        }
      } catch (error) {
        console.error('Error fetching wallpapers:', error);
        setAllWallpapers([]);
      }
      setLoading(false);
    };

    fetchWallpapers();
  }, []);

  useEffect(() => {
    if (filterType) {
      setFilteredWallpapers(allWallpapers.filter(wp => wp.wallpaperType === filterType));
    } else {
      setFilteredWallpapers(allWallpapers);
    }
  }, [filterType, allWallpapers]);

  return (
    <div className="wallpaper-grid-container">
      <div className="wallpaper-grid">
        {loading && <p>Loading wallpapers...</p>}
        {!loading && filteredWallpapers.length === 0 && <p>No wallpapers found.</p>}

        {!loading && filteredWallpapers.map((wallpaper) => (
          <WallpaperCard
            key={wallpaper._id}
            id={wallpaper._id}
            imageUrl={`${import.meta.env.VITE_API_BASE_URL}/uploads/${wallpaper.imageName}`}
          />
        ))}
      </div>
      <AddWallpaperButton onClick={onAddWallpaper} />
    </div>
  );
}

export default WallpaperGrid;
