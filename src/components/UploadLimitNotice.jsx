import React, { useEffect, useState } from 'react';

function UploadLimitNotice({ userEmail, onLimitReached }) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchUploadCount = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/wallpapers/count/${userEmail}`);
        const data = await res.json();
        if (res.ok) {
          setCount(data.count);
          if (data.count >= 5 && onLimitReached) {
            onLimitReached(true); // notify parent if limit is reached
          }
        } else {
          console.error('Error fetching count:', data.message);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    if (userEmail) {
      fetchUploadCount();
    }
  }, [userEmail, onLimitReached]);

  return (
    <div style={{ marginBottom: '16px', fontWeight: '500' }}>
      {count !== null ? (
        <span style={{ color: count >= 5 ? 'red' : 'var(--text-primary)' }}>
          You’ve uploaded {count} of 5 wallpapers
        </span>
      ) : (
        <span>Loading upload count...</span>
      )}
    </div>
  );
}

export default UploadLimitNotice;
