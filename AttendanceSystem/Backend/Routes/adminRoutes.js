const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const { verifyToken, isAdmin } = require('../Middlewares/auth');

// All routes require authentication and admin role
router.use(verifyToken);
router.use(isAdmin);

// Get all leave requests
router.get('/leave-requests', adminController.getAllLeaveRequests);

// Approve leave request
router.put('/leave-requests/:id/approve', adminController.approveLeaveRequest);

// Reject leave request
router.put('/leave-requests/:id/reject', adminController.rejectLeaveRequest);

// Get all users
router.get('/users', adminController.getAllUsers);

// Get statistics
router.get('/statistics', adminController.getStatistics);

// Set proof deadline for a leave request
router.put('/leave-requests/:id/proof-deadline', adminController.setProofDeadline);

module.exports = router;

