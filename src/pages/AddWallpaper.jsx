import React, { useState } from 'react';
import Header from '../components/Header';
import UploadWallpaperForm from '../components/UploadWallpaperForm';
import UploadLimitNotice from '../components/UploadLimitNotice';
import './AddWallpaper.css';

function AddWallpaper() {
  const [limitReached, setLimitReached] = useState(false);
  const userEmail = localStorage.getItem("userEmail");

  return (
    <div className="add-wallpaper-page">
      <Header hideTypes hideThemeToggle />
      <div className="form-wrapper">
        <h2>Add New Wallpaper</h2>
        <UploadLimitNotice userEmail={userEmail} onLimitReached={setLimitReached} />
        {!limitReached && <UploadWallpaperForm />}
      </div>
    </div>
  );
}

export default AddWallpaper;
