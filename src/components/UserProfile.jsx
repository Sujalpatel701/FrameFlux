import React from 'react';

function UserProfile({ userEmail, onLogout }) {
  return (
    <div style={{ padding: '1rem', maxWidth: '400px', margin: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)' }}>
      <h2>User Profile</h2>
      <p><strong>Email:</strong> {userEmail}</p>
      <button onClick={onLogout} style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', border: 'none', backgroundColor: 'var(--button-bg)', color: 'var(--text-primary)' }}>
        Logout
      </button>
    </div>
  );
}

export default UserProfile;
