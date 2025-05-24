// src/components/WallpaperTypes.jsx
import React from 'react';
import './WallpaperTypes.css';

function WallpaperTypes({ onSelectType }) {
  const types = [
    'Nature', 'Abstract', 'Animals', 'Space',
    'Architecture', 'Technology', 'Minimalist',
    'Art', 'Cars', 'Anime', 'Game'
  ];

  return (
    <div className="wallpaper-types">
      <button onClick={() => onSelectType('')}>All</button>
      {types.map((type) => (
        <button key={type} onClick={() => onSelectType(type)}>{type}</button>
      ))}
    </div>
  );
}

export default WallpaperTypes;
