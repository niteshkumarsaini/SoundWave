import React, { useState } from "react";
import "../External CSS/TrendingSection.css";

const playlists = [
  {
    title: "Top Hits 2025",
    artist: "Various Artists",
    img: "./music.jpg",
    songs: ["Hit Me Up", "Feel the Beat", "Summer Vibes", "Forever Young"],
  },
  {
    title: "Lo-Fi Chill",
    artist: "Lo-Fi Studio",
    img: "./dj.jpg",
    songs: ["Evening Rain", "Sleepy Clouds", "Dim Light", "Peaceful Mind"],
  },
  {
    title: "Workout Mix",
    artist: "Gym Squad",
    img: "./dj.jpg",
    songs: ["Push Hard", "No Pain No Gain", "Beast Mode", "Sweat It"],
  },
  {
    title: "Classical Calm",
    artist: "Mozart, Bach",
    img: "./music.jpg",
    songs: ["Moonlight Sonata", "Canon in D", "The Four Seasons"],
  },
];

const TrendingSection = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  return (
    <section className="modern-trending-section">
      <h2 className="section-title">🔥 Trending Now</h2>
      <div className="modern-content-wrapper">
        <div className={`playlist-gallery ${selectedPlaylist ? "shrink" : ""}`}>
          {playlists.map((item, index) => (
            <div
              key={index}
              className="modern-card"
              onClick={() => setSelectedPlaylist(item)}
            >
              <img src={item.img} alt={item.title} className="modern-image" />
              <div className="modern-info">
                <h3>{item.title}</h3>
                <p>{item.artist}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedPlaylist && (
          <div className="playlist-panel">
            <div className="playlist-header">
              <div>
                <h3>{selectedPlaylist.title}</h3>
                <p>{selectedPlaylist.artist}</p>
              </div>
              <button onClick={() => setSelectedPlaylist(null)}>✕</button>
            </div>
            <img src={selectedPlaylist.img} alt="cover" className="playlist-cover" />
            <ul className="track-list">
              {selectedPlaylist.songs.map((song, idx) => (
                <li key={idx}>🎵 {song}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingSection;
