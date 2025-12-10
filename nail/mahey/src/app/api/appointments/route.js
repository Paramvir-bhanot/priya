import connectToDatabase from '../../../lib/mongodb';
import Appointment from '@/models/Appointment';


export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Get data from request body
    const { 
      customerName, 
      phoneNumber, 
      anotherNumber, 
      serviceType, 
      appointmentDate, 
      appointmentTime, 
      notes 
    } = req.body;

    // Validate required fields
    if (!customerName || !phoneNumber || !serviceType || !appointmentDate || !appointmentTime) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate service type
    const validServiceTypes = [
      'Nail Extensions',
      'Nail Art(simple/advanced)',
      'Gel Polish',
      'press-on nails',
      'gel extensions',
      'acrylic nail',
      'gel-x nails',
      'custom nail art',
      'manicure',
      'pedicure',
      'refill'
    ];
    
    if (!validServiceTypes.includes(serviceType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service type'
      });
    }

    // Parse the appointment date
    const parsedDate = new Date(appointmentDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }

    // Check if appointment already exists at the same date and time
    const existingAppointment = await Appointment.findOne({
      appointmentDate: parsedDate,
      appointmentTime: appointmentTime,
      bookingStatus: { $nin: ['cancelled', 'done'] } // Don't check cancelled or done appointments
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: 'Time slot already booked'
      });
    }

    // Create new appointment
    const appointment = new Appointment({
      customerName,
      phoneNumber,
      anotherNumber: anotherNumber || '',
      serviceType,
      appointmentDate: parsedDate,
      appointmentTime,
      notes: notes || '',
      bookingStatus: 'pending'
    });

    // Save to database
    await appointment.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: {
        id: appointment._id,
        customerName: appointment.customerName,
        phoneNumber: appointment.phoneNumber,
        serviceType: appointment.serviceType,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        bookingStatus: appointment.bookingStatus,
        createdAt: appointment.createdAt
      }
    });

  } catch (error) {
    console.error('Error booking appointment:', error);
    
    // Handle duplicate key errors or validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }

    // Handle duplicate appointment error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Appointment already exists for this time slot'
      });
    }

    // Generic server error
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}