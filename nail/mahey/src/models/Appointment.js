import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  
  anotherNumber: {
    type: String,
    trim: true
  },
  
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: [
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
    ]
  },
  
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  
  appointmentTime: {
    type: String,
    required: [true, 'Appointment time is required']
  },
  
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  
  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'done', 'cancelled'],
    default: 'pending'
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // This will automatically update updatedAt
});

// Update the updatedAt field before saving
// Use a synchronous pre hook (no `next` callback) so Mongoose handles it correctly
AppointmentSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

// Check if the model already exists to prevent recompilation error
const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);

export default Appointment;