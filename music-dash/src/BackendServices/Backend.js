import axios from "axios";
import Swal from 'sweetalert2';
import LoginCacheHandler from "./LoginCacheHandler";
import UserCache from "./UserCache";

class BackendService {
  static async generateToken(Username, Password) {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        username: Username,
        password: Password
      });

      // Show success alert
      await Swal.fire({
        title: "Login Successful!",
        text: "You have successfully logged in. Redirecting to your dashboard...",
        icon: "success"
      });

      //set the user
      UserCache.saveUser(Username)
      // Save the token
      LoginCacheHandler.saveToken(response.data.token);

      return { success: true };
    } catch (err) {
      console.log(err);

      await Swal.fire({
        title: "Login Failed",
        text: err.response?.data?.message || "Something went wrong.",
        icon: "error"
      });

      return { success: false };
    }
  }

  static async validateTokenWithBackend() {
    const token = LoginCacheHandler.getSavedToken(); // Get saved token
    console.log("Saved Token value from backend.js",token)
    
    if (!token) {
      console.log("No token found.");
      return { valid: false, message: "No token found." };
    }

    try {
      const response = await axios.get("http://localhost:8000/auth/validate", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return {
        valid: true,
        username: response.data.username
      };
    } catch (error) {
      console.error("Token validation failed:", error.response?.data || error.message);

      return {
        valid: false,
        message: error.response?.data?.message || "Token is invalid or expired."
      };
    }
  }
}

export default BackendService;
