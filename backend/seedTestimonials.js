const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Testimonial = require('./models/Testimonial');

dotenv.config({ path: path.join(__dirname, '.env') });

const testimonials = [
  {
    name: 'Sachin',
    role: 'Wedding Client',
    event: 'Wedding Planning',
    quote: 'Event Foundation brought grace and discipline to every detail of our wedding. The experience was effortless and extraordinary.',
    rating: 5,
    isActive: true
  },
  {
    name: 'Shoib',
    role: 'Corporate Partner',
    event: 'Corporate Events',
    quote: 'They transformed our corporate annual meet into a world-class production. Every guest walked away impressed.',
    rating: 5,
    isActive: true
  },
  {
    name: 'Priyanshu Verma',
    role: 'Social Host',
    event: 'Birthday & Private Parties',
    quote: 'Creative, responsive, and truly premium in execution. We trusted them once and now recommend them to everyone.',
    rating: 5,
    isActive: true
  },
  {
    name: 'Piyush',
    role: 'Wedding Client',
    event: 'Wedding Planning',
    quote: 'From venue styling to artist management, everything was coordinated flawlessly. Incredible team and hospitality.',
    rating: 5,
    isActive: true
  },
  {
    name: 'Ayush Kumar',
    role: 'Destination Client',
    event: 'Destination Events',
    quote: 'Their attention to aesthetics and punctual delivery made our destination celebration feel magical and stress-free.',
    rating: 5,
    isActive: true
  },
  {
    name: 'Shama Khan',
    role: 'Private Client',
    event: 'Birthday & Private Parties',
    quote: 'The team captured our vision perfectly. Elegant decor, smooth planning, and memories we will cherish forever.',
    rating: 5,
    isActive: true
  }
];

const seedTestimonials = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding testimonials...');

    // Clear existing testimonials
    await Testimonial.deleteMany();
    console.log('Cleared existing testimonials');

    // Insert new testimonials
    await Testimonial.insertMany(testimonials);
    console.log('Successfully seeded testimonials');

    process.exit();
  } catch (error) {
    console.error('Error seeding testimonials:', error);
    process.exit(1);
  }
};

seedTestimonials();
