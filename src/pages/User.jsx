import React, { useState } from 'react';
import Header from '../components/Header';
import UserProfile from '../components/UserProfile';

function User() {
  const [userEmail, setUserEmail] = useState('john.doe@example.com');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    alert('Logged out!');
  };

  if (!isLoggedIn) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>You are logged out.</p>;
  }

  return (
    <>
      {/* We can still pass the props, but Header hides things conditionally */}
      <Header toggleTheme={() => {}} darkMode={false} />
      <div style={{ padding: '2rem' }}>
        <UserProfile userEmail={userEmail} onLogout={handleLogout} />
      </div>
    </>
  );
}

export default User;
