# Full-Stack MERN To-Do App

A responsive, full-stack To-Do application built to practice modern web development using the MERN stack (MongoDB, Express, React, Node.js). 

## 🚀 Features

- **Create Tasks:** Add new tasks with a title and an optional description.
- **View Tasks:** See a list of all your pending and completed tasks.
- **Mark as Completed:** Easily change the status of tasks with a click.
- **RESTful API:** Robust backend API built with Express.js.
- **Database Integration:** Persistent data storage using MongoDB and Mongoose.
- **Data Validation:** Strict input validation using Zod to ensure data integrity.
- **Clean UI:** A simple, intuitive, and responsive user interface built with React.

## 🛠️ Tech Stack

### Frontend
- **React.js** (Bootstrapped with Vite)
- **Vanilla CSS** for clean, standard styling
- **Fetch API** for asynchronous HTTP requests

### Backend
- **Node.js & Express.js** for the server framework
- **MongoDB & Mongoose** for the database schema and models
- **Zod** for schema validation
- **CORS** for cross-origin resource sharing

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. You will also need a MongoDB connection (local or MongoDB Atlas).

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lPrincel/ToDo-App.git
   cd To-Do-App
   ```

2. **Setup the Backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add your MongoDB connection string:
   ```env
   MONGO_URI=your_mongodb_connection_string
   ```
   Start the backend server:
   ```bash
   node index.js
   ```
   *(The backend runs on http://localhost:3000)*

3. **Setup the Frontend**
   Open a new terminal window/tab:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Open the link provided by Vite (usually `http://localhost:5173`) in your browser to view the app!