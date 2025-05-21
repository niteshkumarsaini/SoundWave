import React, { useEffect, useState } from "react";
import axios from "axios";
import "../External CSS/YouTubeToMP3Downloader.css";
import UserCache from "../BackendServices/UserCache";
import LoginCacheHandler from "../BackendServices/LoginCacheHandler";
import BackendService from "../BackendServices/Backend";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";

const YouTubeToMP3Downloader = () => {
  const [youtubeURL, setYoutubeURL] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [downloadedTitle, setDownloadedTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [user, setUser] = useState(UserCache.getUser());
  const [token, setToken] = useState(LoginCacheHandler.getSavedToken());

  const [message, setMessage] = useState();

  const notify = () =>
    toast.success("🎧 MP3 downloaded successfully!", {
      className: "custom-toast",
      bodyClassName: "custom-toast-body",
      icon: "🎶"
    });

  const navigate = useNavigate();

  useEffect(() => {
    tokenValidation();
  }, []);

  async function tokenValidation() {
    let res = await BackendService.validateTokenWithBackend();
    if (res.valid === false) {
      UserCache.removeActiveUser();
      LoginCacheHandler.logout();
      navigate("/signin");
      return;
    }
    console.log(res, "Token Validation");
  }

  const handleDownload = async () => {
    setDownloading(true);
    setError("");
    setThumbnail("");
    setDownloadedTitle("");

    if (!youtubeURL.trim()) {
      setError("Please enter a YouTube URL");
      setDownloading(false);
      return;
    }

    let youtubeObject = {
      url: youtubeURL,
      username: user,
      title: songTitle,
      artist: artistName,
    };

    console.log(youtubeObject);

    try {
      const response = await axios.post(
        "http://localhost:8000/youtube/download",
        youtubeObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const message = response.data;
      notify();
      console.log(message);
    } catch (err) {
      console.error(err);
      setError("Failed to download. Please check the URL or try again.");
    } finally {
      setDownloading(false);
    }
  };

  const extractFileName = (message, extension) => {
    const parts = message.split(" ");
    return parts.find((p) => p.endsWith(extension));
  };

  return (
    <div className="upload-parent">
      <div className="ytmp3-container">
        <h2>🎶 YouTube to MP3 Downloader</h2>
        <input
          type="text"
          placeholder="Enter YouTube video URL"
          value={youtubeURL}
          onChange={(e) => setYoutubeURL(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Song Title"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Artist Name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
        <button onClick={handleDownload} disabled={downloading}>
          {downloading ? "Downloading..." : "Download MP3"}
        </button>
        {error && <p className="error">{error}</p>}

        {thumbnail && (
          <div className="thumbnail-preview">
            <h4>🎬 Video Thumbnail</h4>
            <img src={thumbnail} alt="YouTube Thumbnail" />
            <a href={thumbnail} download="thumbnail.jpg">
              Download Thumbnail
            </a>
          </div>
        )}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
};

export default YouTubeToMP3Downloader;
