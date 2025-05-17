import React from 'react';
import Header from '../components/Header';
import WallpaperGrid from '../components/WallpaperGrid';
import Footer from '../components/Footer';
import './Home.css';

function Home({ toggleTheme, darkMode }) {
  const handleAddWallpaper = () => {
    alert('Add wallpaper clicked!');
  };

  return (
    <>
      <div className="header-container">
        <Header toggleTheme={toggleTheme} darkMode={darkMode} />
      </div>

      <div className="grid-container">
        <WallpaperGrid onAddWallpaper={handleAddWallpaper} />
      </div>

      <Footer />
    </>
  );
}

export default Home;
