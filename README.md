# 🎵 SoundWave – Full Stack Music App (Spring Boot + ReactJS + MySQL)

**SoundWave** is a full-featured music platform that lets users upload, manage, and enjoy their music collections. Users can also download songs from YouTube as MP3s and organize them into custom playlists. Built with **ReactJS** (frontend), **Spring Boot** (backend), and **MySQL** (database), it delivers a seamless and secure music management experience.

---

## 🚀 Features

- 🔐 **Authentication**
  - Secure login and registration
  - JWT-based session management

- 📥 **YouTube to MP3 Downloader**
  - Paste a YouTube video link and download the audio as MP3
  - Automatically fetches and saves the thumbnail
  - MP3 and thumbnail are added to the user's music collection

- 🎵 **Upload Songs**
  - Upload your own MP3 files
  - View and manage your music library

- 🎶 **Playlists**
  - Create your own playlists
  - Add/remove songs
  - Organize your music efficiently

- 🏠 **User Dashboard**
  - Personalized dashboard with uploaded songs, playlists, and downloaded content

---

## 🧰 Tech Stack

### 🔧 Backend – Spring Boot
- Java 17+
- Spring Boot
- Spring Security (JWT)
- **MySQL** (Relational Database)
- File Storage (Local/FileSystem or Cloud)
- RESTful APIs

### 💻 Frontend – ReactJS
- ReactJS with Functional Components
- React Router DOM
- Axios for API communication
- Modern UI with Bootstrap / Tailwind CSS / Custom Styles

---

## 📁 Project Structure



## 📁 Project Structure

- SoundWave/
- ├── music/
- │ ├── src/
- │ └── application.properties
- ├── music-dash/
- │ ├── src/
- │ │ ├── components/
- │ │ ├── External CSS/
- │ │ └── App.js
- │ └── public/

## 📌 How to Run

### Backend
1. Clone the repo and navigate to `music/`.
2. Configure `application.properties` with your MySQL credentials.
3. Run the Spring Boot application.

### Frontend
1. Navigate to `music-dash/`.
2. Run `npm install` to install dependencies.
3. Run `npm start` to launch the React app.

---

## 📬 Contribution & Feedback

Contributions, feature requests, and feedback are welcome! Feel free to open issues or pull requests.

---
