import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Navbar from './Components/Navbar';
import HeroSection from './Components/HeroSection';
import TrendingSection from './Components/TrendingSection';
import DiscoverSection from './Components/DiscoverSection';
import MusicPlayer from './Components/MusicPlayer';
import SignIn from './Components/SignIn';
import BrowseSection from './Components/BrowseSection';
import Dashboard from './Components/Dashboard';
import UploadSong from './Components/UploadSong';
import UserPlaylists from './Components/UserPlaylists';
import YouTubeToMP3Downloader from './Components/YouTubeToMP3Downloader';

function Home() {
  document.title="Home | SoundWave"
  return (
    <>
         <Navbar />
      <HeroSection />
      {/* <TrendingSection />
      <DiscoverSection /> */}
      <MusicPlayer />
    </>
  );
}
function Browse(){
   document.title="Browse | SoundWave"
  return (
    <>
         <Navbar />
    <BrowseSection/>
    <MusicPlayer/>
    </>
  )
}
function Radio(){
  document.title="Radio | SoundWave"

  return (
    <>
         <Navbar />
    <DiscoverSection/>
    <TrendingSection/>
    <MusicPlayer/>
    </>
  )
}

function Library(){
   document.title="Library | SoundWave"
   
   
  return(
<>
<Navbar />
{/* <BrowseSection/>
<DiscoverSection/>
<MusicPlayer/> */}

</>





  )
}

function Signin(){
  return (
    <>
    <Navbar/>
    <SignIn/>
    
    
    </>
  )

}
function Dash(){
  return (
    <>
    <Navbar/>
    <Dashboard/>
    <MusicPlayer/>
    </>
  )
}

function UploadSongviaLink(){
  return (

    <>
    
    <Navbar/>
    <YouTubeToMP3Downloader/>
    </>
  )
}


function Playlists(){
  return(
    <>
    <Navbar/>
    <UserPlaylists/>
    
    
    </>
  )
}



function Upload(){

  return (
    <>
    <Navbar/>
    <UploadSong/>
    {/* <Dashboard/> */}
    
    
    </>
  )
}


function App() {
  return (
    <div className="App">
      <BrowserRouter>
   
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/library" element={<Library />} />
          {/* Add more routes as needed */}
          <Route path="/home" element={<Dash />} />
          <Route path="/radio" element={<Radio />} />
          <Route path="/upload" element={<Upload />}/>
          <Route path='/playlists' element={<Playlists/>}/>
            <Route path='/uploadsong' element={<UploadSongviaLink/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
