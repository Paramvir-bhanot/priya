import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/DBconnection';
import Appointment from '@/models/Appointment';

export async function POST(request) {
  if (request.method && request.method !== 'POST') {
    return NextResponse.json({ success: false, message: 'Method not allowed' }, { status: 405 });
  }

  try {
    await connectToDatabase();

    const body = await request.json();
    const {
      customerName,
      phoneNumber,
      anotherNumber,
      serviceType,
      appointmentDate,
      appointmentTime,
      notes
    } = body;

    if (!customerName || !phoneNumber || !serviceType || !appointmentDate || !appointmentTime) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

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
      return NextResponse.json({ success: false, message: 'Invalid service type' }, { status: 400 });
    }

    const parsedDate = new Date(appointmentDate);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ success: false, message: 'Invalid date format' }, { status: 400 });
    }

    const existingAppointment = await Appointment.findOne({
      appointmentDate: parsedDate,
      appointmentTime: appointmentTime,
      bookingStatus: { $nin: ['cancelled', 'done'] }
    });

    if (existingAppointment) {
      return NextResponse.json({ success: false, message: 'Time slot already booked' }, { status: 409 });
    }

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

    await appointment.save();

    return NextResponse.json(
      {
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
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error booking appointment:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({ success: false, message: 'Validation error', errors: errors }, { status: 400 });
    }

    if (error.code === 11000) {
      return NextResponse.json({ success: false, message: 'Appointment already exists for this time slot' }, { status: 409 });
    }

    return NextResponse.json({ success: false, message: 'Internal server error', error: error.message }, { status: 500 });
  }
}