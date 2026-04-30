const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  socialLinks: {
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    youtube: { type: String, default: '' },
    whatsapp: { type: String, default: '' }
  },
  contactDetails: {
    phonePrimary: { type: String, default: '+91-9511118936' },
    phoneSecondary: { type: String, default: '+91-9511118935' },
    email: { type: String, default: 'contact@eventfoundation.in' },
    address: { 
      type: String, 
      default: '10th Floor, Wing A, Summit Building, Vibhuti Khand, Gomti Nagar, Lucknow - 226010' 
    }
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Settings', settingsSchema);
