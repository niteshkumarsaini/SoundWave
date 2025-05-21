import React, { useState, useRef, useEffect } from "react";
import "../External CSS/MusicPlayer.css";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
} from "react-icons/fa";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  // Play/Pause handler
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
        // alert("pause")
      audio.pause();
    } else {
        // alert("play")
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Track progress
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      const percentage = (audio.currentTime / audio.duration) * 100;
      setProgress(percentage);
    }
  };

  // Volume Control
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  // Click-to-seek
  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * audio.duration;
    audio.currentTime = newTime;
  };

  // Reset on end
  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <footer className="music-player">
      {/* Audio */}
      <audio
        ref={audioRef}
        src="./Music/2.mp3"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* Left: Cover + Text + Visualizer */}
      <div style={{display:"flex"}}>

    
      <div className="music-details">
        <img src="./Covers/2.jpg" alt="Track" className="album-art" />
        <div className="track-text">
          <h4>Buddhu Sa Mann</h4>
          <p>Abhiruchi Chand</p>
        </div>
       
      </div>
      <div className="music-visual-parent">
      <div className={`visualizer ${isPlaying ? "active" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        
          

        </div>


      </div>
      </div>

      {/* Center: Controls + Progress */}
      <div className="music-controls">
        <div className="control-buttons">
          <FaStepBackward />
          <button className="play-pause" onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <FaStepForward />
        </div>
        <div
          className="progress-container"
          onClick={handleProgressClick}
          ref={progressRef}
        >
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Right: Volume */}
      <div className="volume-controls">
        <FaVolumeUp />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </footer>
  );
};

export default MusicPlayer;
