const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Signup route
router.post('/signup', authController.signup);
router.post('/login', authController.login); // 👈 ADD THIS

module.exports = router;
