// components/Loader.jsx
import React from "react";
import "../External CSS/Loader.css"; // custom CSS for loader

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="music-spinner">
          <span className="note">🎵</span>
        </div>
        <p>Loading SoundWave...</p>
      </div>
    </div>
  );
};

export default Loader;
