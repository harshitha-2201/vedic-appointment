const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');



// Controller function to create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { name, email, phone, date } = req.body;
    const userId = req.user.userId;

    const newAppointment = new Appointment({
      userId,
      name,
      email,
      phone,
      date,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Fetch all appointments for a doctor
exports.getAppointments = async (req, res) => {
  try {
    // Since you have only one doctor, there's no need to filter by doctorId
    const appointments = await Appointment.find();  // Get all appointments
    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};


// Accept or Decline an appointment
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    if (!appointmentId || !status) {
      return res.status(400).json({ message: 'Invalid request: missing appointmentId or status' });
    }
    
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();

    // Send email notification
    await sendEmailNotification(appointment.email, status);

    res.status(200).json({ message: 'Appointment status updated successfully' });
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(500).json({ message: 'Error updating appointment', error: err.message });
  }
};


// Function to send email notifications
const sendEmailNotification = async (email, status) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const subject = status === 'Accepted' 
    ? 'Your Appointment has been Accepted' 
    : 'Your Appointment has been Declined';
  
  const text = status === 'Accepted'
    ? 'Your appointment has been accepted. Please be on time.'
    : 'Sorry, the doctor is unavailable for this date. Please book another appointment.';
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  });
};
