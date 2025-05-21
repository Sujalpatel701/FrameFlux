import React, { useState } from 'react';
import CompactUserBar from './CompactUserBar';
import './UploadWallpaperForm.css';

function UploadWallpaperForm() {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [type, setType] = useState('Nature');
  const [description, setDescription] = useState('');

  const userEmail = localStorage.getItem('userEmail');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setFileName(file ? file.name : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      alert('You must be logged in to upload a wallpaper.');
      return;
    }

    const wordCount = title.trim().split(/\s+/).length;
    if (wordCount > 10) {
      alert('Title must not exceed 10 words.');
      return;
    }

    if (!imageFile) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('email', userEmail);
    formData.append('description', description);
    formData.append('wallpaperType', type);
    formData.append('image', imageFile);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/wallpapers/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert('Wallpaper uploaded successfully!');
        setTitle('');
        setImageFile(null);
        setFileName('');
        setType('Nature');
        setDescription('');

        // Refresh the page after 0.5s to show updated list
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        alert(data.message || 'Failed to upload wallpaper.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      {userEmail && <CompactUserBar userEmail={userEmail} />}

      <input
        type="text"
        placeholder="Wallpaper Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleFileChange}
        required
        style={{ display: 'none' }}
      />

      <label htmlFor="image-upload" className="file-upload-label">
        {fileName || "Choose Image File"}
      </label>

      {fileName && <div className="file-upload-name">{fileName}</div>}

      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="Nature">Nature</option>
        <option value="Abstract">Abstract</option>
        <option value="Animals">Animals</option>
        <option value="Space">Space</option>
        <option value="Architecture">Architecture</option>
        <option value="Technology">Technology</option>
        <option value="Minimalist">Minimalist</option>
        <option value="Art">Art</option>
        <option value="Cars">Cars</option>
        <option value="Anime">Anime</option>
        <option value="Game">Game</option>
      </select>

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />

      <button type="submit">Upload Wallpaper</button>
    </form>
  );
}

export default UploadWallpaperForm;
