import React from 'react';
import Header from '../components/Header';
import './About.css';

function About({ toggleTheme, darkMode }) {
  return (
    <>
      <Header toggleTheme={toggleTheme} darkMode={darkMode} onSelectType={() => {}} />
      <div className="about-page">
        <h2>About FrameFlux</h2>
        <p>
          FrameFlux is a modern wallpaper-sharing platform where users can upload, explore,
          and enjoy high-quality wallpapers across various categories.
          It is built using the MERN stack, emphasizing a responsive and user-friendly experience.
        </p>

        <div className="creator-info">
          <img src="./sujal.png" alt="Creator" className="creator-image" />
          <h3>Created by Your Name</h3>
          <p>Feel free to connect with me on:</p>
          <ul className="social-links">
            <li><a href="https://github.com/Sujalpatel701" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/sujal-patel-b2b602248/" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/sujal_patel_701/" target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default About;
