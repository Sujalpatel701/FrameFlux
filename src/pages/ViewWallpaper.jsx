// src/pages/ViewWallpaper.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WallpaperDetails from '../components/WallpaperDetails';
import Header from '../components/Header';
import CommentsSection from '../components/CommentsSection';
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
        
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData || "Failed to fetch wallpaper");
        }

        const data = await response.json();
        setWallpaper(data);
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
          <>
            <WallpaperDetails wallpaper={wallpaper} />
            <CommentsSection wallpaperId={wallpaper._id} />
          </>
        )}
      </div>
    </div>
  );
}

export default ViewWallpaper;
