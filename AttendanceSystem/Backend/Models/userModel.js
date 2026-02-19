const db = require('../Config/db');
const bcrypt = require('bcryptjs');

// User model - database operations for user functions

// Find user by email
exports.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Find user by ID
exports.findUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Create new user
exports.createUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, role, student_id, department } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = 'INSERT INTO users (name, email, password, role, student_id, department) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, email, hashedPassword, role || 'user', student_id, department], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Get user's leave requests
exports.getUserLeaveRequests = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM leave_requests WHERE user_id = ? ORDER BY created_at DESC';
    db.query(query, [userId], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Create leave request
exports.createLeaveRequest = (requestData) => {
  return new Promise((resolve, reject) => {
    const { user_id, from_date, to_date, leave_type, description } = requestData;
    const query = 'INSERT INTO leave_requests (user_id, from_date, to_date, leave_type, description) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [user_id, from_date, to_date, leave_type, description], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Cancel leave request
exports.cancelLeaveRequest = (id, userId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM leave_requests WHERE id = ? AND user_id = ? AND status = "Pending"';
    db.query(query, [id, userId], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Update user profile
exports.updateUserProfile = (id, userData) => {
  return new Promise((resolve, reject) => {
    const { name, student_id, department } = userData;
    const query = 'UPDATE users SET name = ?, student_id = ?, department = ? WHERE id = ?';
    db.query(query, [name, student_id, department, id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};
