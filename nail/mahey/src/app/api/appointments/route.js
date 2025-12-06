
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/DBconnection';
import Appointment from '@/models/Appointment';
import { sendPatientConfirmation, sendDoctorNotification } from '@/lib/email';

export async function POST(request) {
  try {
    await dbConnect();
    
    const appointmentData = await request.json();
    
    // Check for existing appointment at same time
    const existingAppointment = await Appointment.findOne({
      date: appointmentData.date,
      time: appointmentData.time,
      status: { $in: ['pending', 'confirmed'] }
    });
    
    if (existingAppointment) {
      return NextResponse.json(
        { error: 'This time slot is already booked. Please choose another time.' },
        { status: 400 }
      );
    }
    
    // Create appointment
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    
    // Send confirmation email to patient using Resend
    const patientEmailResult = await sendPatientConfirmation(
      appointment.patientEmail, 
      {
        appointmentId: appointment.appointmentId,
        patientName: appointment.patientName,
        patientPhone: appointment.patientPhone,
        date: appointment.date,
        time: appointment.time,
        problem: appointment.problem
      }
    );
    
    // Send notification to doctor (without Resend)
    const doctorEmailResult = await sendDoctorNotification({
      appointmentId: appointment.appointmentId,
      patientName: appointment.patientName,
      patientEmail: appointment.patientEmail,
      patientPhone: appointment.patientPhone,
      patientGender: appointment.patientGender,
      date: appointment.date,
      time: appointment.time,
      problem: appointment.problem,
      address: appointment.address
    });
    
    return NextResponse.json(
      { 
        success: true,
        message: 'Appointment booked successfully!',
        appointment: {
          id: appointment._id,
          appointmentId: appointment.appointmentId,
          patientName: appointment.patientName,
          date: appointment.date,
          time: appointment.time,
          problem: appointment.problem
        },
        emails: {
          patient: patientEmailResult.success,
          doctor: doctorEmailResult.success
        }
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Appointment booking error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to book appointment. Please try again.' 
      },
      { status: 500 }
    );
  }
}

// Get all appointments or filter by date
export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const appointmentId = searchParams.get('appointmentId');
    
    let query = {};
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      
      query.date = {
        $gte: startDate,
        $lt: endDate
      };
    }
    
    if (appointmentId) {
      query.appointmentId = appointmentId;
    }
    
    const appointments = await Appointment.find(query)
      .sort({ date: 1, time: 1 });
    
    return NextResponse.json({ 
      success: true, 
      appointments 
    });
    
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}