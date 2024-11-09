// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const appointmentsRoute = require('./routes/appointmentRoute');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Set allowed origin in .env if needed
  credentials: true,
}));

// const allowedOrigins = ['https://appointment-booking-frontend-wtqy.onrender.com'];

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));




// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentsRoute);

// Server Listener
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
