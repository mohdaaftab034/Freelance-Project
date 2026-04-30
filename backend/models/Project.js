const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Weddings', 'Corporate', 'Social', 'Destination'],
  },
  location: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  guests: {
    type: String,
  },
  services: {
    type: String,
  },
  summary: {
    type: String,
    required: true,
  },
  overviewParagraphs: [String],
  executionHighlightsText: String,
  executionHighlightsList: [String],
  coverImage: {
    type: String,
    required: true,
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
