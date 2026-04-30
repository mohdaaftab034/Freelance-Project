const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars at the very beginning
dotenv.config({ path: path.join(__dirname, '.env') });

const cors = require('cors');
const connectDB = require('./config/db');
const enquiryRoutes = require('./routes/enquiryRoutes');
const homeRoutes = require('./routes/homeRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const projectRoutes = require('./routes/projectRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const authRoutes = require('./routes/authRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const teamRoutes = require('./routes/teamRoutes');

if (!process.env.MONGO_URI) {
  console.error('CRITICAL ERROR: MONGO_URI is not defined in .env file');
}

// Connect to database
connectDB();

const app = express();

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Enable CORS with restricted origins for production
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL,
  'http://localhost:5173', // Vite default for local dev
  'http://localhost:5174'  // Second Vite instance for local dev
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Backend is running' });
});

// Mount routers
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/team', teamRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err);
  
  if (err.name === 'MulterError') {
    return res.status(400).json({ success: false, error: `Upload error: ${err.message}` });
  }

  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
