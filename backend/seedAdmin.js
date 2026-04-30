const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for admin seeding...');

    // Remove existing admin if any
    await User.deleteMany({ email: 'event@management.com' });

    // Create new admin
    const admin = new User({
      email: 'event@management.com',
      password: 'Event@123',
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedAdmin();
