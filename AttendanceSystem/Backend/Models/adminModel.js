const db = require('../Config/db');

// Admin model - database operations for admin functions

// Get all leave requests with user details
exports.getAllLeaveRequests = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT lr.*, u.name as student_name, u.email as student_email, u.student_id, u.department 
      FROM leave_requests lr 
      JOIN users u ON lr.user_id = u.id 
      ORDER BY lr.created_at DESC
    `;
    db.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Get pending leave requests only
exports.getPendingRequests = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT lr.*, u.name as student_name, u.email as student_email, u.student_id, u.department 
      FROM leave_requests lr 
      JOIN users u ON lr.user_id = u.id 
      WHERE lr.status = 'Pending'
      ORDER BY lr.created_at DESC
    `;
    db.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Update leave request status
exports.updateRequestStatus = (id, status, admin_remarks) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE leave_requests SET status = ?, admin_remarks = ? WHERE id = ?';
    db.query(query, [status, admin_remarks || '', id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};
