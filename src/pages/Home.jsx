// src/pages/Home.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import WallpaperGrid from '../components/WallpaperGrid';
import Footer from '../components/Footer';
import './Home.css';

function Home({ toggleTheme, darkMode }) {
  const [selectedType, setSelectedType] = useState('');

  const handleAddWallpaper = () => {
    alert('Add wallpaper clicked!');
  };

  return (
    <>
      <div className="header-container">
        <Header toggleTheme={toggleTheme} darkMode={darkMode} onSelectType={setSelectedType} />
      </div>

      <div className="grid-container">
        <WallpaperGrid onAddWallpaper={handleAddWallpaper} filterType={selectedType} />
      </div>

      <Footer />
    </>
  );
}

export default Home;
