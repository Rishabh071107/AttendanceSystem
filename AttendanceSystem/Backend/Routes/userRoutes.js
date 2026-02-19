const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const { verifyToken, isUser } = require('../Middlewares/auth');

// Public routes (no authentication required)

// User registration (for students)
router.post('/register', userController.register);

// Admin registration (for faculty) - Public route
router.post('/register-admin', userController.registerAdmin);

// User login
router.post('/login', userController.login);

// Protected routes (require authentication)
router.use(verifyToken);

// Get user's leave requests
router.get('/leave-requests', isUser, userController.getMyLeaveRequests);

// Apply for leave
router.post('/leave', isUser, userController.applyLeave);

// Cancel leave request
router.delete('/leave-requests/:id', isUser, userController.cancelLeaveRequest);

// Get user profile
router.get('/profile', isUser, userController.getProfile);

// Update user profile
router.put('/profile', isUser, userController.updateProfile);

module.exports = router;
