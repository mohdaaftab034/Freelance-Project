const TeamMember = require('../models/TeamMember');

exports.getTeamMembers = async (req, res) => {
  try {
    const team = await TeamMember.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllTeamMembersAdmin = async (req, res) => {
  try {
    const team = await TeamMember.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
