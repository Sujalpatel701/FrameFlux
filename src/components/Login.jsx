import React, { useState } from 'react';

function Login({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Logging in with ${email}`);
    // Add real login logic here
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <button onClick={() => onSwitch('signup')}>Sign Up</button>
      </p>
    </div>
  );
}

export default Login;
