import React from "react";
import "../External CSS/DiscoverSection.css";

const artists = [
  {
    name: "Ariana Nova",
    genre: "Pop Fusion",
    img: "./dj.jpg",
  },
  {
    name: "DJ Shadowline",
    genre: "Electronic",
    img: "./dj.jpg",
  },
  {
    name: "The Midnight Owls",
    genre: "Indie Rock",
    img: "./dj.jpg",
  },
  {
    name: "Sitar Souls",
    genre: "World Music",
    img: "./dj.jpg",
  },
];

const DiscoverSection = () => {
  return (
    <section className="discover-wrapper">
      <h2 className="discover-heading">🎧 Discover Artists</h2>
      <div className="artist-grid">
        {artists.map((artist, index) => (
          <div className="artist-card" key={index}>
            <img src={artist.img} alt={artist.name} />
            <div className="artist-info">
              <h4>{artist.name}</h4>
              <p>{artist.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiscoverSection;
