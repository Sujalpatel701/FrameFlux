import React, { useEffect, useState } from 'react';
import WallpaperCard from './WallpaperCard';
import './UserWallpapers.css'; // custom styles

function UserWallpapers({ email }) {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserWallpapers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/wallpapers?email=${email}`);
        const data = await response.json();
        if (response.ok) {
          setWallpapers(data);
        } else {
          console.error('Failed to fetch wallpapers:', data.message);
        }
      } catch (error) {
        console.error('Error fetching wallpapers:', error);
      }
    };

    if (email) {
      fetchUserWallpapers();
    }
  }, [email]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this wallpaper and all its comments?");
    if (!confirmDelete) return;

    try {
      setLoading(true);

      // 1. Try to delete the wallpaper
      const wallpaperResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/wallpapers/${id}`, {
        method: 'DELETE',
      });
      const wallpaperData = await wallpaperResponse.json();

      if (!wallpaperResponse.ok && wallpaperResponse.status !== 404) {
        throw new Error(wallpaperData.message || "Failed to delete wallpaper");
      }

      // 2. Try to delete associated comments (doesn't fail if no comments exist)
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments/${id}`, {
        method: 'DELETE',
      });

      // 3. Remove wallpaper from UI
      setWallpapers((prev) => prev.filter(wp => wp._id !== id));
      alert("Wallpaper and its comments (if any) deleted successfully.");
    } catch (err) {
      alert(err.message || "Something went wrong while deleting.");
    } finally {
      setLoading(false);
    }
  };

  if (!wallpapers.length) {
    return <p style={{ textAlign: 'center' }}>No wallpapers uploaded yet.</p>;
  }

  return (
    <div className="user-wallpapers">
      <h3>Your Uploaded Wallpapers</h3>
      <div className="user-wallpapers-grid">
        {wallpapers.map((wp) => (
          <div className="user-wallpaper-card" key={wp._id}>
            <WallpaperCard
              imageUrl={`${import.meta.env.VITE_API_BASE_URL}/uploads/${wp.imageName}`}
              id={wp._id}
              small
            />
            <button
              className="delete-btn"
              onClick={() => handleDelete(wp._id)}
              disabled={loading}
            >
              {loading ? 'Deleting...' : '🗑 Delete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserWallpapers;
