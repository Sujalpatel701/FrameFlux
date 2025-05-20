import React from 'react';
import Header from '../components/Header';
import UploadWallpaperForm from '../components/UploadWallpaperForm';
import './AddWallpaper.css';

function AddWallpaper() {
  return (
    <div className="add-wallpaper-page">
      <Header hideTypes hideThemeToggle />
      <div className="form-wrapper">
        <h2>Add New Wallpaper</h2>
        <UploadWallpaperForm />
      </div>
    </div>
  );
}

export default AddWallpaper;
