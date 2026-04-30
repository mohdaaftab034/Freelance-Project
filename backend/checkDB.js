const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');

dotenv.config();

const checkDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const services = await Service.find({});
    console.log('Current Services in DB:');
    services.forEach(s => {
      console.log(`ID: ${s._id}, Title: ${s.title}, Slug: ${s.slug}`);
    });
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkDB();
