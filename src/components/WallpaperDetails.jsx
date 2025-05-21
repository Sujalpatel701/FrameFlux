import React from 'react';
import './WallpaperDetails.css';

function WallpaperDetails({ wallpaper }) {
  const imageUrl = `${import.meta.env.VITE_API_BASE_URL}/uploads/${wallpaper.imageName}`;

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = wallpaper.imageName;
      link.click();

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="wallpaper-detail-container">
      <div className="wallpaper-preview">
        <img
          src={imageUrl}
          alt={wallpaper.title}
          className="wallpaper-detail-img"
        />
      </div>
      <div className="wallpaper-info">
        <h2>{wallpaper.title}</h2>
        <p><strong>Description:</strong> {wallpaper.description}</p>
        <p><strong>Category:</strong> {wallpaper.wallpaperType}</p>
        <p><strong>Uploaded by:</strong> {wallpaper.email}</p>
        <button className="download-btn" onClick={handleDownload}>
          ⬇️ Download
        </button>
      </div>
    </div>
  );
}

export default WallpaperDetails;
