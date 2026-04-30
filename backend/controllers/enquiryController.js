const Enquiry = require('../models/Enquiry');

// @desc    Create new enquiry
// @route   POST /api/enquiries
// @access  Public
exports.createEnquiry = async (req, res, next) => {
  try {
    console.log('Received enquiry submission:', req.body);
    const enquiry = await Enquiry.create(req.body);
    console.log('Enquiry stored successfully:', enquiry._id);

    res.status(201).json({
      success: true,
      data: enquiry,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private (Admin)
exports.getEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Private (Admin)
exports.updateEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        error: 'Enquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin)
exports.deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        error: 'Enquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
