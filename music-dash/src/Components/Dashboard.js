import React, { useEffect, useState } from "react";
import MusicPlayer from "./MusicPlayer";
import Loader from "../Components/Loader";
import "../External CSS/Dashboard.css";
import LoginCacheHandler from "../BackendServices/LoginCacheHandler";
import { useNavigate } from "react-router-dom";
import BackendService from "../BackendServices/Backend";
import UserCache from "../BackendServices/UserCache";
import axios from "axios";
import { FaAddressBook, FaArrowCircleUp, FaArrowRight, FaArrowUp, FaAws, FaChessQueen, FaChrome, FaCircle, FaMusic, FaPlus, FaPlusCircle, FaPlusSquare, FaRegPlusSquare, FaUserClock } from "react-icons/fa";

const tracks = [
  {
    id: 1,
    title: "Buddhu Sa Mann",
    artist: "Abhiruchi Chand",
    cover: "./Covers/2.jpg",
    file: "./Music/2.mp3",
  },
  {
    id: 2,
    title: "Shape of You",
    artist: "Ed Sheeran",
    cover: "./Covers/3.jpg",
    file: "./Music/4.mp3",
  },
  {
    id: 3,
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "./Covers/4.jpg",
    file: "./Music/4.mp3",
  },
];

const Dashboard = () => {
  const [songs,setSongs]=useState([]);
  const [currentTrack, setCurrentTrack] = useState(songs[0]);
  const [loading, setLoading] = useState(true); // Initial state: loader visible

  const navigate = useNavigate();
  const [user, setUser] = useState(UserCache.getUser());
const [token, setToken] = useState(LoginCacheHandler.getSavedToken());

  useEffect(() => {

    tokenValidation();
    const verify = async () => {
      try {
        const isLoggedIn = await LoginCacheHandler.validateToken();
        if (!isLoggedIn) {
          navigate("/signin");
        } else {
          document.title = "Dashboard | SoundWave";
          setLoading(false); // Hide loader only after validation
        }
      } catch (err) {
        console.error("Validation error", err);
        navigate("/signin");
      }
    };

    verify();

    //fetching songs from backend
   
fetchSongs();
    




  }, [navigate]);
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

  function redirectToAdd(){
    navigate("/upload")
  }


async function fetchSongs() {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/videos/all-songs/${user}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const fetchedSongs = response.data;
    setSongs(fetchedSongs);
    
    // ✅ Set default current track if there are songs
    if (fetchedSongs.length > 0) {
      setCurrentTrack(fetchedSongs[0]);
    }

    console.log(fetchedSongs);
  } catch (err) {
    console.log(err);
  }
}


  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
  };

  // ✅ Show loader immediately on route entry
  if (loading) return <Loader />;

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2 className="sidebar-heading">🎵 Music Library</h2>


        {
          songs.length===0?<>
           <div>
  
          <button className="btn-collection"  onClick={redirectToAdd}>Start Collection <FaArrowUp/></button>
        </div>
          
          </>:<></>
        }
        <ul className="track-list">
          {songs.map((track) => (
            <li
              key={track.id}
              className={`track-item ${currentTrack.id === track.id ? "active" : ""}`}
              onClick={() => handleTrackSelect(track)}
            >
              <img src={`http://localhost:8000/api/v1/videos/thumbnail/${track.id}`} alt={track.title}  className="track-cover" />
              <div className="track-meta">
                <p className="track-title">{track.title}</p>
                <p className="track-artist">{track.artist}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <main className="dashboard-main">
        <h1 className="dashboard-heading">Welcome Back! 🎶</h1>

      {
        songs.length==0?<>
        <div>
          <p>No Songs have been added yet!</p>
          <button className="btn-add" onClick={redirectToAdd} >Add Now <FaMusic/></button>
        </div>
        
        </>:<>
          <div className="now-playing-card">
          <img src={`http://localhost:8000/api/v1/videos/thumbnail/${currentTrack.id}`} alt={currentTrack.title} className="now-playing-cover" />
          <div className="now-playing-info">
            <h2 className="now-playing-title">{currentTrack.title}</h2>
            <p className="now-playing-artist">{currentTrack.artist}</p>
            <div className="md-progress-bar">
              <div className="md-progress-fill"></div>
            </div>
          </div>
        </div>
        </>





      }
      </main>

      <MusicPlayer track={currentTrack} />
    </div>
  );
};

export default Dashboard;
