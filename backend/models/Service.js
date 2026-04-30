const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  serviceIcon: String,
  overview: [String],
  overviewImage: String,
  excellenceImage: String,
  included: [{
    icon: String,
    title: String,
    text: String
  }],
  features: [{
    title: String,
    text: String
  }],
  timelineSteps: [String],
  gallery: [String],
  styleVariant: String,
  breadcrumb: String
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
