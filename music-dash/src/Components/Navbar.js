import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaMusic,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaCog,
  FaHome,
  FaUpload,
  FaCircleNotch,
  FaCircle,
  FaMinusCircle,
  FaPlusSquare,
  FaLink,
} from "react-icons/fa";
import "../External CSS/Navbar.css";
import LoginCacheHandler from "../BackendServices/LoginCacheHandler";
import UserCache from "../BackendServices/UserCache";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(LoginCacheHandler.validateToken());
  const location = useLocation();
  const navigate=useNavigate();

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDropdown = () => setProfileOpen(!isProfileOpen);
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setProfileOpen(false);
    //remove the token 
    LoginCacheHandler.logout();
    navigate("/signin")
    
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/browse", label: "Browse" },
    { path: "/library", label: "Library" },
    { path: "/radio", label: "Radio" },
    { path: "/home", label: "My Dashboard" },

  ];

  return (
    <nav className="modern-navbar">
      <div className="navbar-brand">
        <FaMusic className="brand-icon" />
        <span className="brand-name">SoundWave</span>
      </div>

      <ul className={`navbar-links ${isMobileMenuOpen ? "open" : ""}`}>
        {navLinks.map(({ path, label }) => (
          <li key={path}>
            <Link
              to={path}
              className={location.pathname === path ? "active" : ""}
            >
              {label}
            </Link>
          </li>
        ))}



      </ul>

      <div className="navbar-actions">
        {isLoggedIn ? (
          <div className="profile-menu">
            <FaUserCircle
              className="profile-icon"
              onClick={toggleProfileDropdown}
            />
            
            {isProfileOpen && (
              <div className="dropdown-menu">
                <Link to="/profile"><FaUserCircle /> My Profile</Link>
              
                <Link to="/settings"><FaCog /> Settings</Link>
                <Link to="/upload"><FaUpload />Upload Song</Link>
                   <Link to="/uploadsong"><FaLink />Upload Via Link</Link>
                  <Link to="/playlists"><FaPlusSquare />Playlists</Link>
                <button onClick={handleSignOut}><FaSignOutAlt /> Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/signin" className="btn-signin">Sign In</Link>
            {/* <Link to="/signup" className="btn-signup">Sign Up</Link> */}
          </div>
        )}

        <button className="menu-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
