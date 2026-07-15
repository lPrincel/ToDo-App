# Secure MERN To-Do Application

A full-stack To-Do list application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project features a complete, secure authentication system ensuring that user data is strictly isolated and protected. 

## ✨ Features

- **User Authentication:** Secure signup and login functionality.
- **Password Hashing:** Passwords are mathematically hashed using `bcrypt` before being stored in the database.
- **JWT Sessions:** Stateless user sessions managed via JSON Web Tokens (JWT) stored in `localStorage`.
- **Protected API Routes:** Custom Express middleware ensures only authenticated users can access or modify data.
- **Data Isolation:** Users can only view, complete, and delete their own specific tasks.
- **Modern UI:** Clean, responsive interface featuring subtle glassmorphism elements.

## 🛠️ Tech Stack

**Frontend:**
- React (bootstrapped with Vite)
- Vanilla CSS
- `fetch` API for network requests

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database & ODM)
- `jsonwebtoken` (Auth)
- `bcrypt` (Security)
- `zod` (Input Validation)
- `cors` (Cross-Origin Resource Sharing)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <https://github.com/lPrincel/ToDo-App.git>
cd To-Do-App
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add your secret keys:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm run dev
```

### 4. Open the App
Visit `http://localhost:5173` in your browser to start managing your tasks!