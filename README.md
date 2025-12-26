# 🦫 Platypus – AI‑Powered Meeting Intelligence Platform

Platypus is a **web‑based intelligent video conferencing platform** that combines **real‑time WebRTC communication** with **AI‑driven meeting intelligence** such as live transcription, summaries, and meeting history.

This project is designed as a **final‑year / capstone‑level system**, focusing on **practical implementation, clean architecture, and real‑world usability**.

---

## 🚀 Features

### 🔹 Core Features

* 🔐 User Authentication (Firebase Authentication)
* 🎥 Real‑time 1‑to‑1 Video Calling (WebRTC)
* 🎤 Mute / Unmute Microphone
* 📷 Camera On / Off Control
* 🔄 Stable Peer‑to‑Peer Connection using Socket.io signaling

### 🔹 AI‑Powered Features

* 📝 Live Speech‑to‑Text Transcription (Web Speech API)
* 🧠 Automatic Meeting Summary (Demo implementation)
* 📊 Meeting History Dashboard

### 🔹 Product‑Level Enhancements

* 🎨 Modern Dark UI
* 📂 Meeting History Cards
* 🧩 Modular Frontend Architecture
* ⚙️ Clean separation of concerns (Auth, Meeting, Dashboard)

---

## 🏗️ System Architecture

```
Frontend (HTML, CSS, JavaScript)
   │
   ├── Firebase Authentication
   │
   ├── WebRTC (Audio / Video)
   │       │
   │       └── Socket.io Signaling Server
   │
   ├── Speech Recognition (Browser API)
   │
   └── Dashboard (Meeting History & Summaries)
```

> **Note:** Audio and video streams flow directly between peers. The server is used **only for signaling**.

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)
* WebRTC
* Web Speech API

### Backend (Signaling)

* Node.js
* Express.js
* Socket.io

### Cloud & Auth

* Firebase Authentication

---

## 📁 Project Structure

```
platypus/
│
├── login.html
├── dashboard.html
├── meeting.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── auth.js        # Firebase authentication
│   ├── meeting.js     # WebRTC + controls + transcription
│   └── dashboard.js   # Meeting history
│
└── server/
    ├── server.js      # Socket.io signaling server
    └── package.json
```

---

## ⚙️ How It Works

### 1️⃣ Authentication

* Users log in using Firebase Authentication.
* Successful login redirects to the dashboard.

### 2️⃣ Video Conferencing

* WebRTC establishes peer‑to‑peer audio/video communication.
* Socket.io is used to exchange offers, answers, and ICE candidates.

### 3️⃣ Live Transcription

* Browser Speech Recognition API converts speech to text in real time.
* Transcription auto‑restarts to ensure stability.

### 4️⃣ AI Summary (Conceptual)

* Meeting transcript is summarized using extractive techniques (demo).
* In production, transformer‑based NLP models can be used.

### 5️⃣ Dashboard

* Users can view past meetings and summaries in a centralized interface.

---

## ▶️ How to Run the Project

### 1️⃣ Install Dependencies

```bash
cd server
npm install
```

### 2️⃣ Start Signaling Server

```bash
node server.js
```

### 3️⃣ Start Frontend

* Open project using **VS Code Live Server**
* Open `login.html` in browser (preferably Chrome)

### 4️⃣ Start a Meeting

* Login → Dashboard → New Meeting
* Open meeting in **two browser windows** (normal + incognito)

---

## 🧪 Supported Browsers

* ✅ Google Chrome (Recommended)
* ⚠️ Firefox (Limited Speech API support)
* ❌ Safari (Not recommended for Web Speech API)

---

## 🎓 Academic & Viva Highlights

You can confidently say:

> “Platypus integrates WebRTC for peer‑to‑peer communication and AI‑based meeting intelligence to enhance productivity and knowledge retention.”

> “Speech recognition is implemented at the browser level for demonstration, while the architecture supports scalable AI models on the backend.”

---

## 🚧 Future Enhancements

* Multi‑user group meetings
* Speaker diarization
* Action‑item extraction
* Cloud‑based AI summarization
* Mobile application
* End‑to‑end encryption

---

## 👩‍💻 Author

**Riddhi Jain**
Final Year Project – Computer Applications / AI‑ML

---

## ⭐ Conclusion

Platypus is not just a video conferencing tool — it is an **intelligent meeting assistant** designed to improve collaboration, documentation, and decision‑making.

---

> ✨ *Built with learning, clarity, and real‑world relevance in mind.*
