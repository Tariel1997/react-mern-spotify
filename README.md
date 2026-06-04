# 🎵 Spotify Clone — Full-Stack MERN Web Application 🎧

A feature-rich, high-performance **Spotify Clone** built using the modern **MERN Stack** (MongoDB, Express, React, Node.js), TypeScript, Tailwind CSS, shadcn/ui, Zustand, and Socket.io. This application delivers a seamless audio streaming experience, featuring real-time collaborative chat, an interactive music player, secure user authentication, and a complete admin dashboard for music management.

---

## 🚀 Key Features

### 🎵 1. Music & Audio Streaming

- **Interactive Player:** Smooth audio playback controls including Play/Pause, Next/Previous track, Loop (Repeat), Shuffle, Volume Adjustment, and an interactive progress bar/seeker.
- **Albums & Playlists:** Organized view of music albums, displaying release years, cover art, and matching tracklists.
- **Cloud-Hosted Assets:** High-quality music tracks and album artwork stored and streamed seamlessly via **Cloudinary**.

### 💬 2. Real-Time Chat & Friends Activity Feed

- **Live Community Chat:** Direct user-to-user messaging powered by **Socket.io** for real-time message delivery.
- **Activity Status Tracker:** Discord-style "Friend Activity" sidebar showing which users are online and what track they are currently playing in real-time (e.g., _Listening to "After Hours"_ or _Idle_).

### 🛡️ 3. Powerful Admin Dashboard

- **Music Management (CRUD):** Admins can add and delete tracks and albums.
- **Secure File Uploads:** Integrated forms with drag-and-drop capability to upload audio files and artwork directly to Cloudinary.
- **Dashboard Analytics:** Visual statistics tracking total active users, total songs, total albums, and unique artists.

### 🔐 4. Secure Authentication & User Syncing

- **Clerk Authentication:** Modern authentication and profile management using **Clerk**.
- **Automatic DB Synchronization:** Syncs Clerk user profiles into MongoDB to enable immediate messaging and activity tracking.

---

## 🛠️ Technology Stack

| Layer        | Technology / Libraries Used     | Description                                                      |
| ------------ | ------------------------------- | ---------------------------------------------------------------- |
| **Frontend** | React (Vite), TypeScript        | Component-based interactive UI with static type safety           |
|              | Tailwind CSS                    | Sleek, modern styling with a dark-mode focus                     |
|              | Radix UI, Base UI, Lucide Icons | Accessible headless components and UI iconography                |
|              | Zustand                         | Clean and lightweight global state management                    |
|              | Socket.io Client                | Real-time websocket communication                                |
|              | Clerk React                     | Authentication and user session management                       |
| **Backend**  | Node.js, Express.js             | Robust RESTful API architecture                                  |
|              | MongoDB (Mongoose)              | Document-based database for schemas & relations                  |
|              | Socket.io                       | Real-time bidirectional event handling server                    |
|              | Cloudinary SDK                  | Media storage, compression, and delivery                         |
|              | Node-Cron                       | Background scheduling for system maintenance (temp file cleanup) |
|              | Express-Fileupload              | Handling multipart form data for uploads                         |

---

## 📂 Project Structure

```text
react-mern-spotify/
├── backend/                     # Express & Node.js backend
│   ├── src/
│   │   ├── controller/          # API route controllers
│   │   ├── lib/                 # Shared libraries (DB, Socket.io, Cloudinary config)
│   │   ├── middleware/          # Auth verification and admin checks
│   │   ├── models/              # Mongoose schemas (User, Song, Album, Message)
│   │   ├── routes/              # Express API endpoints
│   │   ├── seeds/               # Seed scripts for songs and albums
│   │   └── index.js             # Express application root
│   └── package.json
│
├── frontend/                    # Vite & React frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── layout/              # Sidebar, Header, and Friend Activity wrappers
│   │   ├── lib/                 # Axios configurations & utility scripts
│   │   ├── pages/               # Page views (Home, Album, Admin, Chat, etc.)
│   │   ├── providers/           # Context providers (Auth, Theme)
│   │   ├── stores/              # Zustand stores (Player, Music, Chat, Auth)
│   │   └── App.tsx              # React entry routing & app layout
│   └── package.json
│
└── package.json                 # Monorepo setup script for easy deployment
```

---

## ⚙️ Getting Started & Local Setup

### 📋 Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (Local server or MongoDB Atlas URL)
- [Clerk Account](https://clerk.com/) (For API authentication keys)
- [Cloudinary Account](https://cloudinary.com/) (For media asset hosting)

### 🔧 Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Tariel1997/react-mern-spotify.git
   cd react-mern-spotify
   ```

2. **Backend Configuration:**
   - Navigate to the `backend/` directory:
     ```bash
     cd backend
     ```
   - Create a `.env` file based on the environment variables needed:

     ```env
     PORT=5001
     MONGODB_URI=your_mongodb_connection_string
     ADMIN_EMAIL=your_admin_email_configured_in_clerk

     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

     NODE_ENV=development

     CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     CLERK_SECRET_KEY=your_clerk_secret_key
     ```

3. **Frontend Configuration:**
   - Navigate to the `frontend/` directory:
     ```bash
     cd ../frontend
     ```
   - Create a `.env` file:
     ```env
     VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     ```

4. **Install all dependencies & Build the Application:**
   - Return to the project root directory and run the root installation & build script:
     ```bash
     cd ..
     npm run build
     ```
     _(This installs package dependencies across both backend and frontend, and creates the optimized frontend production build.)_

---

## 💾 Seeding Database (Optional)

If you'd like to populate your database with dummy music data to test out the application right away, run the following scripts inside the `backend/` directory:

```bash
cd backend
npm run seed:songs
npm run seed:albums
```

---

## 🏃 Running the Application

### Development Mode 🛠️

To run both backend and frontend concurrently in development mode:

1. **Start the backend server:**

   ```bash
   cd backend
   npm run dev
   ```

   _(Running on `http://localhost:5001`)_

2. **Start the React dev server:**
   ```bash
   cd frontend
   npm run dev
   ```
   _(Running on `http://localhost:3000`)_

### Production Mode 🚀

To run the fully built project serving static assets from the Express backend:

```bash
npm start
```

_(Access the app at the configured port, e.g., `http://localhost:5001`)_

---
