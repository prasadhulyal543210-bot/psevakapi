const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const panController = require('../controllers/pan.controller');
const rcController = require('../controllers/rc.controller');

// AUTH
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// PAN
router.get('/find-pan', panController.findPan);

router.post('/find-rc', rcController.findRC);

module.exports = router;
