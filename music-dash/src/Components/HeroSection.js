import React from "react";
import "../External CSS/HeroSection.css";
import { FaPlay } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="hero-wrapper">
      <div className="hero-left">
        <h1 className="hero-title">Feel the Beat</h1>
        <p className="hero-subtext">Stream fresh music, curated just for you. Anytime, anywhere.</p>
       <div className="hero-btn-parent">

       <button className="hero-play-btn" >
          <FaPlay />
          Play Now
        </button>

       </div>
      </div>
      <div className="hero-right">
        <div className="music-card">
          <img src="./Covers/2.jpg" alt="Album" />
          <div className="music-info">
            <h3>Buddhu Sa Mann</h3>
            <p>By Abhiruchi Chand</p>
          </div>
        </div>
        {/* <div className="visualizer">
          <span></span><span></span><span></span><span></span><span></span>
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;