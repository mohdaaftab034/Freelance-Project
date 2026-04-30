const mongoose = require('mongoose');

const HeroSlideSchema = new mongoose.Schema({
  image: String,
  label: String,
  title: String,
  description: String,
  ctaText: { type: String, default: 'Contact Us' },
  ctaLink: { type: String, default: '/contact-us' },
});

const CounterSchema = new mongoose.Schema({
  label: String,
  value: String,
});

const HomeContentSchema = new mongoose.Schema({
  heroSlides: [HeroSlideSchema],
  partners: [String],
  counters: [CounterSchema],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('HomeContent', HomeContentSchema);
