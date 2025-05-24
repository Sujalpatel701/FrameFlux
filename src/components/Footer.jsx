// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} FrameFlux. All rights reserved.</p>
      <div className="footer-links">
        <Link to="/about">About</Link>
      </div>
    </footer>
  );
}

export default Footer;
