import React, { useEffect, useState } from "react";
import "../External CSS/UploadSong.css";
import { FaFile, FaUpload } from "react-icons/fa";
import axios from "axios";
import SongService from "../BackendServices/SongService";
import UserCache from "../BackendServices/UserCache";
import BackendService from "../BackendServices/Backend";
import LoginCacheHandler from "../BackendServices/LoginCacheHandler";
import { useNavigate } from "react-router-dom";

const UploadSong = () => {
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);



  useEffect(()=>{

    tokenValidation();
  },[])


  const navigate=useNavigate();


  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

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





  const handleSubmit = (e) => {
    e.preventDefault();
    if (!songTitle || !artist || !audioFile || !thumbnail) {
      alert("Please fill in all fields and upload both files.");
      return;
    }

    const formData = new FormData();
    formData.append("title", songTitle);
    formData.append("artist", artist);
    formData.append("file", audioFile);
    formData.append("thumbnail", thumbnail);
    console.log(formData)

    //sending to backend 
let response=SongService.sendSong(formData);
console.log(response)

    console.log("Submitting form...");
    // axios.post("/api/upload", formData)
  };

  return (
    <div className="upload-parent">
      <div className="upload-song-container glass-card">
        <h2 className="upload-heading">🎧 Upload Your Song</h2>
        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Song Title</label>
            <input
              type="text"
              placeholder="Enter title"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Artist</label>
            <input
              type="text"
              placeholder="Enter artist name"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Song File</label>
            <input type="file" accept="audio/*" onChange={handleAudioChange} required />
          </div>

          <div className="form-group">
            <label>Upload Thumbnail</label>
            <input type="file" accept="image/*" onChange={handleThumbnailChange} required />
          </div>

          {thumbnailPreview && (
            <div className="thumbnail-preview animate-in">
              <img src={thumbnailPreview} alt="Thumbnail Preview" />
            </div>
          )}

          <button type="submit" className="upload-button"><FaUpload/> Upload</button>
        </form>
      </div>
    </div>
  );
};

export default UploadSong;
