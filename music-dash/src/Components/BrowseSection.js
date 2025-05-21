import React from "react";
import "../External CSS/BrowseSection.css";

const categories = [
  { title: "Pop Hits", color: "#e91e63", image: "/music.jpg" },
  { title: "Chill Vibes", color: "#3f51b5", image: "/dj.jpg" },
  { title: "Workout", color: "#4caf50", image: "/music.jpg" },
  { title: "Top Charts", color: "#ff9800", image: "/music.jpg" },
  { title: "Lo-Fi", color: "#9c27b0", image: "/dj.jpg" },
  { title: "Jazz & Blues", color: "#607d8b", image: "/music.jpg" },
];

const BrowseSection = () => {
  return (
    <section className="browse-section">
      <h2 className="browse-title">Browse</h2>
      <div className="browse-grid">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="browse-card"
            style={{ backgroundColor: cat.color }}
          >
            <img src={cat.image} alt={cat.title} className="browse-img" />
            <div className="browse-info">
              <h3>{cat.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseSection;
