const express = require('express');
const router = express.Router();
const { createAppointment ,  getAppointments, updateAppointmentStatus} = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authmiddleware');

// Route for creating a new appointment
router.post('/appointment', authMiddleware, createAppointment);

// Fetch all appointments (protected route)
router.get('/list-appointments', authMiddleware, getAppointments);

// Update appointment status (protected route)
router.put('/list-appointments/update-status', authMiddleware, updateAppointmentStatus);



module.exports = router;
