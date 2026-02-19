const db = require('../Config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../Utils/generateToken');

// User registration (for students)
exports.register = (req, res) => {
  const { name, email, password, student_id, department } = req.body;
  
  // Check if user already exists
  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking user', error: err.message });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user with role 'user' (student)
    const insertQuery = 'INSERT INTO users (name, email, password, role, student_id, department) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(insertQuery, [name, email, hashedPassword, 'user', student_id, department], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating user', error: err.message });
      }
      const token = generateToken(results.insertId, name, email, 'user');
      res.status(201).json({ 
        message: 'User registered successfully', 
        token,
        user: { id: results.insertId, name, email, role: 'user', student_id, department }
      });
    });
  });
};

// Admin registration (for faculty)
exports.registerAdmin = (req, res) => {
  const { name, email, password, employee_id, department } = req.body;
  
  // Check if user already exists
  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking user', error: err.message });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user with role 'admin' (faculty)
    const insertQuery = 'INSERT INTO users (name, email, password, role, student_id, department) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(insertQuery, [name, email, hashedPassword, 'admin', employee_id, department], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating admin user', error: err.message });
      }
      const token = generateToken(results.insertId, name, email, 'admin');
      res.status(201).json({ 
        message: 'Admin registered successfully', 
        token,
        user: { id: results.insertId, name, email, role: 'admin', student_id: employee_id, department }
      });
    });
  });
};

// User login
exports.login = (req, res) => {
  const { email, password } = req.body;
  
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging in', error: err.message });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = generateToken(user.id, user.name, user.email, user.role);
    res.json({ 
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, student_id: user.student_id, department: user.department }
    });
  });
};

// Get user's leave requests
exports.getMyLeaveRequests = (req, res) => {
  const userId = req.user.id;
  
  const query = 'SELECT * FROM leave_requests WHERE user_id = ? ORDER BY created_at DESC';
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching leave requests', error: err.message });
    }
    res.json(results);
  });
};

// Apply for leave
exports.applyLeave = (req, res) => {
  const userId = req.user.id;
  const { from_date, to_date, leave_type, description } = req.body;
  
  const query = 'INSERT INTO leave_requests (user_id, from_date, to_date, leave_type, description) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [userId, from_date, to_date, leave_type, description], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error applying for leave', error: err.message });
    }
    res.status(201).json({ message: 'Leave application submitted successfully', requestId: results.insertId });
  });
};

// Cancel leave request
exports.cancelLeaveRequest = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  const query = 'DELETE FROM leave_requests WHERE id = ? AND user_id = ? AND status = "Pending"';
  db.query(query, [id, userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error canceling leave request', error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Leave request not found or cannot be canceled' });
    }
    res.json({ message: 'Leave request canceled successfully' });
  });
};

// Get user profile
exports.getProfile = (req, res) => {
  const userId = req.user.id;
  
  const query = 'SELECT id, name, email, role, student_id, department, created_at FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching profile', error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(results[0]);
  });
};

// Update user profile
exports.updateProfile = (req, res) => {
  const userId = req.user.id;
  const { name, student_id, department } = req.body;
  
  const query = 'UPDATE users SET name = ?, student_id = ?, department = ? WHERE id = ?';
  db.query(query, [name, student_id, department, userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating profile', error: err.message });
    }
    res.json({ message: 'Profile updated successfully' });
  });
};
