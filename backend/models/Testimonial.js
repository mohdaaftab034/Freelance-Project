const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  role: {
    type: String,
    required: [true, 'Please add a role']
  },
  event: {
    type: String,
    required: [true, 'Please add an event type']
  },
  quote: {
    type: String,
    required: [true, 'Please add a testimonial quote']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  image: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
