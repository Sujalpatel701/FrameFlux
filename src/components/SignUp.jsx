import React, { useState } from 'react';

function SignUp({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Signing up with ${email}`);
    // Add real signup logic here
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <button onClick={() => onSwitch('login')}>Login</button>
      </p>
    </div>
  );
}

export default SignUp;
