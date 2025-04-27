# MOVE2GETR

MOVE2GETR is a MOVE2GETR is a web application dedicated to African students coming to Europe (France) to pursue their studies.
MOVE2GETR will allow them to interact with each other, discover great deals available in France, and learn everything they need to do upon their arrival in the country.  

✨ Features – MOVE2GETR Web App
Create connections. Stay close to your community. Explore Europe together. 🌍✨

🛠️ Authentication
🔐 Secure Registration with strong password rules (minimum 8 characters, 1 uppercase, 1 number, 1 symbol).

🔑 Login/Logout system with JWT tokens.

📨 Email-based login.

✅ Toast notifications for all actions (success & errors).

🛡️ Session management using localStorage.

🧑‍💼 User Profile
🎨 View Profile: Display personal information like name, nationality, gender, age, etc.

🖼️ Upload Profile Picture (avatar upload support).

✏️ Edit Profile: Update only the changed fields (partial PATCH).

❌ Danger Zone: Allow users to permanently delete their account safely.

🛎️ Real-time feedback with Toasts when profile is updated or deleted.

💬 Inbox & Messaging
📥 Inbox Page to chat with contacts.

🔵 Unread Message Counters per contact.

⚡ Real-time messaging via WebSocket.

📬 Mark messages as read after opening a chat.

🗨️ Community Posting
📝 Post Feed: Users can browse community posts (dynamic).

❤️ Vote and comment (social engagement system).

🌟 Smooth scroll animations for a modern feed experience.

🖥️ Frontend
🎨 Fully responsive design (desktop, tablet, mobile).

🌈 TailwindCSS for beautiful components and styling.

🚀 Loading spinners during server requests.

🎬 Splash screen and Parallax background for a premium UX.

✨ Clean separation of pages: Home, Inbox, Profile, Settings, Dashboard.

⚙️ Backend
⚡ FastAPI server with automatic validation.

🗃️ PostgreSQL database using SQLModel ORM.

🔐 Password hashing with bcrypt.

🛡️ Token-based authentication (JWT).

🔄 API endpoints for registration, login, fetching user profile, updating, deleting account.

🛠️ Tech Stack

Frontend	Backend	Database
React.js + Vite ⚛️	FastAPI ⚡	PostgreSQL 🐘

📸 Screenshots
Coming soon.

📚 Setup & Installation
Clone the repository

Install backend dependencies (pip install -r requirements.txt)

Install frontend dependencies (npm install)

Run backend: uvicorn main:app --reload

Run frontend: npm run dev

🚀 Enjoy!

❤️ Contribution
PRs are welcome! Fork it, branch it, propose new features.

⚡ License
MIT License © 2025 MOVE2GETR
