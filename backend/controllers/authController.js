const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Credentials are wrong' });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Credentials are wrong' });
    }

    // In a real app, we'd return a JWT here. 
    // For now, we'll return success and a simple token-like flag.
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
