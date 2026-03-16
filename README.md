# 🔥 Burn-On-Read Message

A **secure ephemeral messaging web application** that allows users to send secret messages through a generated link.  
The message **self-destructs immediately after being read**, ensuring privacy and preventing message persistence.

This project demonstrates how to build a **temporary messaging platform** where sensitive messages can be shared safely and disappear after being viewed.

---

## 🌐 Live Demo

🔗 **Try the App Here:**  
https://burn-on-read-msg.vercel.app/

---

## Features

- Generate a **unique secret link** for every message
- **Burn-on-read functionality** — message deletes after being opened
- **Automatic expiration after 24 hours**
- Easy **copy and share link workflow**
- Lightweight and fast interface
- Fully responsive UI

---

## 🛠 Tech Stack

### Frontend

- React.js
- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### Tools & Libraries

- Mongoose
- dotenv

---

## 📂 Project Structure

```
Burn-On-Read-msg
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   ├── assets
│   └── App.js
│
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/the-Monk-bro/Burn-On-Read-msg.git
cd Burn-On-Read-msg
```

---

### 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

### 3️⃣ Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

### 4️⃣ Setup Environment Variables

Create a `.env` file inside the **backend** folder.

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:3000
```

---

### 5️⃣ Run the Application

Start the backend server:

```bash
cd backend
npm start
```

Start the frontend server:

```bash
cd frontend
npm start
```

The application should now be running locally.

---

## 🧠 How It Works

1. User writes a secret message.
2. The backend stores the message in **MongoDB** with a unique ID.
3. A **unique secret link** is generated.
4. The sender shares the link with the recipient.
5. When the recipient opens the link:
   - The message is fetched from the database.
   - The message is **immediately deleted after being displayed**.
6. If the message is not opened within **24 hours**, it is automatically deleted using a **TTL index** in MongoDB.

---

## 🔒 Security Features

- Single-use secret links
- Automatic message deletion
- MongoDB TTL index for expiration
- No permanent storage of messages

---

## 📸 Example Workflow

```
Write Message
      ↓
Generate Secret Link
      ↓
Share Link
      ↓
Recipient Opens Link
      ↓
Message Displayed Once
      ↓
Message Permanently Deleted
```
