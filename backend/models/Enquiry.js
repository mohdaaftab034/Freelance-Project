const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    maxlength: [30, 'Phone number can not be longer than 30 characters'],
  },
  eventType: {
    type: String,
    required: [true, 'Please select a service type'],
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Closed'],
    default: 'New',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
