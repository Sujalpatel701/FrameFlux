import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import UserProfile from '../components/UserProfile';
import UserWallpapers from '../components/UserWallpapers'; // ✅ Import

function User() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [activeView, setActiveView] = useState('login');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
      setIsLoggedIn(true);
      setActiveView('profile');
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsLoggedIn(true);
        setUserEmail(email);
        localStorage.setItem('userEmail', email);
        alert(data.message);
        setActiveView('profile');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  const handleSignUp = async (username, email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setActiveView('login');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('userEmail');
    setActiveView('login');
  };

  return (
    <>
      <Header hideTypes hideThemeToggle />
      <div style={{ padding: '2rem' }}>
        {activeView === 'login' && <Login onLogin={handleLogin} onSwitch={() => setActiveView('signup')} />}
        {activeView === 'signup' && <SignUp onSignUp={handleSignUp} onSwitch={() => setActiveView('login')} />}
        {activeView === 'profile' && isLoggedIn && (
          <>
            <UserProfile userEmail={userEmail} onLogout={handleLogout} />
            <UserWallpapers email={userEmail} /> {/* ✅ Only shows when logged in */}
          </>
        )}
      </div>
    </>
  );
}

export default User;
