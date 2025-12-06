import mongoose from 'mongoose';

const videoReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  courseName: {
    type: String,
    required: true,
    trim: true,
    default: 'General Course'
  },
  cloudinaryUrl: {
    type: String,
    required: true
  },
  cloudinaryPublicId: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 0
  },
  thumbnail: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
videoReviewSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const VideoCourse = mongoose.models.VideoCourse || mongoose.model('VideoCourse', videoReviewSchema);

export default VideoCourse;

