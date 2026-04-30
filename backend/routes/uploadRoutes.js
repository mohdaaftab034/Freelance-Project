const express = require('express');
const upload = require('../config/cloudinary');
const router = express.Router();

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private (Admin)
router.post('/', upload.single('image'), (req, res) => {
  try {
    console.log('Upload request received');
    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    
    console.log('File uploaded to Cloudinary:', req.file.path);
    res.status(200).json({
      success: true,
      url: req.file.path,
    });
  } catch (error) {
    console.error('CLOUDINARY UPLOAD ERROR:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal Server Error during upload',
      details: error
    });
  }
});

module.exports = router;
