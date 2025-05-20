import React, { useEffect, useState } from 'react';
import './CompactUserBar.css';

function CompactUserBar({ userEmail }) {
  const [username, setUsername] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const resName = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/name`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail }),
        });
        const nameData = await resName.json();
        if (resName.ok) setUsername(nameData.username);

        const resImage = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile/${userEmail}`);
        if (resImage.ok) {
          const imgData = await resImage.json();
          setProfileImageUrl(`${import.meta.env.VITE_API_BASE_URL}${imgData.imageUrl}`);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
    if (userEmail) fetchUserData();
  }, [userEmail]);

  return (
    <div className="compact-user-bar">
      {profileImageUrl && (
        <img src={profileImageUrl} alt="Profile" className="compact-profile-image" />
      )}
      <div className="compact-user-info">
        <p className="compact-username">{username || 'Loading...'}</p>
        <p className="compact-email">{userEmail}</p>
      </div>
    </div>
  );
}

export default CompactUserBar;
