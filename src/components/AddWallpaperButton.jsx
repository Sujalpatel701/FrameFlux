import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddWallpaperButton.css';

function AddWallpaperButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      navigate('/AddWallpaper');
    } else {
      alert('Please log in to add a wallpaper.');
      navigate('/user');
    }
  };

  return (
    <button className="add-wallpaper-btn" onClick={handleClick} title="Add Wallpaper">
      ＋
    </button>
  );
}

export default AddWallpaperButton;
