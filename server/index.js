// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const appointmentsRoute = require('./routes/appointmentRoute');
const adminRoute = require('./routes/adminRoute')

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// app.use(cors({
//     origin: 'https://vedic-appointment-2-dj8f.onrender.com/', // Your frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));
app.use(cors());



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentsRoute);
app.use('/api/admin', adminRoute);

// Server Listener
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
