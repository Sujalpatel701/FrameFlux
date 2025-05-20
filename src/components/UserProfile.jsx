import React, { useEffect, useState } from 'react';
import './UserProfile.css';

function UserProfile({ userEmail, onLogout }) {
  const [username, setUsername] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/name`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail }),
        });

        const data = await response.json();
        if (response.ok) {
          setUsername(data.username);
        } else {
          console.error('Failed to fetch username:', data.message);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    const fetchProfileImage = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile/${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          setProfileImageUrl(`${import.meta.env.VITE_API_BASE_URL}${data.imageUrl}`);
        } else {
          setProfileImageUrl(null);
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
        setProfileImageUrl(null);
      }
    };

    if (userEmail) {
      fetchUsername();
      fetchProfileImage();
    }
  }, [userEmail]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("email", userEmail);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setUploadStatus("Image uploaded successfully");
        setProfileImageUrl(`${import.meta.env.VITE_API_BASE_URL}/uploads/${data.data.imageName}`);
        setSelectedFile(null);
      } else {
        setUploadStatus("Failed to upload image: " + data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Error uploading image");
    }
  };

return (
  <div className="profile-container">
    {profileImageUrl && (
      <img
        src={profileImageUrl}
        alt="User Profile"
        className="profile-image"
      />
    )}

    <div className="profile-info">
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {username || 'Loading...'}</p>
      <p><strong>Email:</strong> {userEmail}</p>

      {!profileImageUrl && (
        <div className="upload-section">
          <p>No profile image uploaded yet. Upload one below:</p>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button className="upload-btn" onClick={handleUpload}>Upload Profile Image</button>
          {uploadStatus && <p>{uploadStatus}</p>}
        </div>
      )}

      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </div>
  </div>
);

}

export default UserProfile;
