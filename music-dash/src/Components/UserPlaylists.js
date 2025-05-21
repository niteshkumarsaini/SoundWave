import { useState, useEffect } from "react";
import "../External CSS/UserPlaylists.css";
import axios from "axios";
import UserCache from "../BackendServices/UserCache";
import LoginCacheHandler from "../BackendServices/LoginCacheHandler";
import BackendService from "../BackendServices/Backend";
import { useNavigate } from "react-router-dom";

const UserPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // <-- Track selected playlist
  const [playlistSongs, setPlaylistSongs] = useState([]); // <-- Track songs of selected playlist
  const [user, setUser] = useState(UserCache.getUser());
  const [token, setToken] = useState(LoginCacheHandler.getSavedToken());
  const navigate = useNavigate();

  useEffect(() => {
    tokenValidation();
    fetchPlaylists();
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

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/playlists/fetch/user=${user}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (Array.isArray(response.data)) {
        setPlaylists(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        setPlaylists(response.data.data);
      } else {
        setPlaylists([]);
      }
    } catch (err) {
      console.error("Failed to load playlists:", err);
      setPlaylists([]);
    }
  };

  const fetchSongsInPlaylist = async (playlistId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/playlists/${playlistId}/songs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlaylistSongs(response.data);
    } catch (error) {
      console.error("Failed to fetch songs:", error);
      setPlaylistSongs([]);
    }
  };

  const openPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    fetchSongsInPlaylist(playlist.id);
  };

  const closeSidebar = () => {
    setSelectedPlaylist(null);
    setPlaylistSongs([]);
  };

  const createPlaylist = async () => {
    if (!newPlaylistName.trim()) return;

    try {
      let formData = new FormData();
      formData.append("playlist", newPlaylistName);

      const response = await axios.post(
        `http://localhost:8000/api/v1/playlists/save/user=${user}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPlaylists([...playlists, response.data]);
      setNewPlaylistName("");
      setShowModal(false);
    } catch (err) {
      console.error("Failed to create playlist:", err);
    }
  };

  return (
    <div className="playlist-container">
      <div className="playlist-header">
        <h2>🎵 Your Playlists</h2>
        <button className="create-btn" onClick={() => setShowModal(true)}>
          ➕ Create New Playlist
        </button>
      </div>

      <div className="playlist-grid">
        {Array.isArray(playlists) && playlists.length === 0 ? (
          <p className="no-playlist-text">No playlists found.</p>
        ) : (
          playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="playlist-card"
              onClick={() => openPlaylist(playlist)}
            >
              <div className="playlist-thumb">
                <img src={"/default-playlist.jpg"} alt={playlist.name} />
              </div>
              <div className="playlist-info">
                <h4>{playlist.name}</h4>
                <p>{playlist.songs?.length || 0} songs</p>
                <button
                  className="btn-add-song-playlist"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Add Song to Playlist");
                  }}
                >
                  Add Song
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right-Side Song List Panel */}
      {selectedPlaylist && (
        <div className="playlist-sidebar">
          <div className="sidebar-header">
            <h3>{selectedPlaylist.name}</h3>
            <button onClick={closeSidebar}>✖</button>
          </div>
          <div className="sidebar-content">
            {playlistSongs.length === 0 ? (
              <p>No songs in this playlist.</p>
            ) : (
              <ul>
                {playlistSongs.map((song, idx) => (
                  <li key={idx}>
                    <strong>{song.title}</strong> — {song.artist}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Modal for new playlist */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Create Playlist</h3>
            <input
              type="text"
              placeholder="Enter playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            <button className="submit-btn" onClick={createPlaylist}>
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPlaylists;
