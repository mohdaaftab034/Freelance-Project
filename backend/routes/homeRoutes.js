const express = require('express');
const {
  getHomeContent,
  updateHomeContent,
} = require('../controllers/homeController');

const router = express.Router();

router.route('/').get(getHomeContent).post(updateHomeContent);

module.exports = router;
