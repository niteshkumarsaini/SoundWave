import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import "../External CSS/SignIn.css";
import BackendService from "../BackendServices/Backend";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Add login logic here

    //Call Backend
    const result = await BackendService.generateToken(formData.email,formData.password);
    console.log(result)
    if (result.success) {
        navigate("/home");
      }
  


    console.log("Logging in with:", formData);
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2 className="signin-title">Welcome Back</h2>
        <p className="signin-subtitle">Sign in to your SoundWave account</p>

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signin-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/forgot-password" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="signin-button">Sign In</button>

          <p className="signup-prompt">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
