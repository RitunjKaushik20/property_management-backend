Property Management System (MERN + Prisma)

A full-stack Property Management System built using the MERN stack, designed to manage properties, users, and leads with secure authentication and a modern UI. The application is fully deployed and production-ready.

🚀 Live Demo

Frontend: property-management-backend-six.vercel.app

Backend API: https://property-management-backend-673l.onrender.com

⚠️ Replace the URLs with your actual deployed links.

🛠 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Axios

React Router DOM

Context API (Authentication)

Backend

Node.js

Express.js

Prisma ORM

MongoDB

JWT Authentication

Multer + Cloudinary (Image Uploads)

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

✨ Features
🔐 Authentication & Authorization

User Registration & Login

JWT-based authentication

Protected routes

Role-based access (Admin/User)

🏢 Property Management

Add new properties

View all properties

View property details

Update and delete properties

Image upload with Cloudinary

📊 Dashboard

User-specific dashboard

My Properties view

Profile management

🌐 General

Responsive UI

RESTful APIs

Environment-based configuration

Production-ready deployment

📁 Project Structure
Property-Management/
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── services/
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── routes/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md

⚙️ Environment Variables
Backend (backend/.env)
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
PORT=8000

Frontend (frontend/.env)
VITE_API_BASE_URL=https://property-management-backend-673l.onrender.com


⚠️ Do not commit .env files.

🧪 Run Locally
1️⃣ Clone Repository
git clone https://github.com/Ritunj-Kaushik20/property-management.git
cd property-management

2️⃣ Backend Setup
cd backend
npm install
npx prisma generate
npm run dev


Backend runs on:

http://localhost:8000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔒 API Authentication Flow

User logs in or registers

JWT token is generated

Token is sent with each protected request

Middleware verifies token before allowing access

📦 Deployment Notes

Backend deployed on Render

Prisma client generated during build

Frontend environment variables configured in Vercel

CORS properly configured for production frontend
