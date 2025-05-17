import React from 'react';
import './AddWallpaperButton.css';

function AddWallpaperButton({ onClick }) {
  return (
    <button className="add-wallpaper-btn" onClick={onClick} title="Add Wallpaper">
      ＋
    </button>
  );
}

export default AddWallpaperButton;
