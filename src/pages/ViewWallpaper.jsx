import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WallpaperDetails from '../components/WallpaperDetails';
import Header from '../components/Header'; // ✅ Import Header
import './ViewWallpaper.css';

function ViewWallpaper({ toggleTheme, darkMode }) {
  const { id } = useParams();
  const [wallpaper, setWallpaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWallpaper = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/wallpapers/${id}`);
        const data = await response.json();
        if (response.ok) {
          setWallpaper(data);
        } else {
          setError(data.message || "Failed to load wallpaper");
        }
      } catch (err) {
        setError(err.message || "Error fetching wallpaper");
      } finally {
        setLoading(false);
      }
    };

    fetchWallpaper();
  }, [id]);

  return (
    <div>
      <Header toggleTheme={toggleTheme} darkMode={darkMode} />
      <div className="view-wallpaper-wrapper">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && wallpaper && (
          <WallpaperDetails wallpaper={wallpaper} />
        )}
      </div>
    </div>
  );
}

export default ViewWallpaper;
