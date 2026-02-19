const db = require('../Config/db');

// Get all leave requests (for admin dashboard)
exports.getAllLeaveRequests = (req, res) => {
  const query = `
    SELECT lr.*, u.name as student_name, u.email as student_email, u.student_id, u.department 
    FROM leave_requests lr 
    JOIN users u ON lr.user_id = u.id 
    ORDER BY lr.created_at DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching leave requests', error: err.message });
    }
    res.json(results);
  });
};

// Approve leave request
exports.approveLeaveRequest = (req, res) => {
  const { id } = req.params;
  const { admin_remarks } = req.body;
  
  const query = 'UPDATE leave_requests SET status = ?, admin_remarks = ? WHERE id = ?';
  db.query(query, ['Approved', admin_remarks || '', id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error approving leave request', error: err.message });
    }
    res.json({ message: 'Leave request approved successfully' });
  });
};

// Reject leave request
exports.rejectLeaveRequest = (req, res) => {
  const { id } = req.params;
  const { admin_remarks } = req.body;
  
  const query = 'UPDATE leave_requests SET status = ?, admin_remarks = ? WHERE id = ?';
  db.query(query, ['Rejected', admin_remarks || '', id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error rejecting leave request', error: err.message });
    }
    res.json({ message: 'Leave request rejected successfully' });
  });
};

// Get all users (for admin)
exports.getAllUsers = (req, res) => {
  const query = 'SELECT id, name, email, role, student_id, department, created_at FROM users ORDER BY created_at DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
    res.json(results);
  });
};

// Get admin statistics
exports.getStatistics = (req, res) => {
  const queries = {
    totalRequests: 'SELECT COUNT(*) as count FROM leave_requests',
    pendingRequests: "SELECT COUNT(*) as count FROM leave_requests WHERE status = 'Pending'",
    approvedRequests: "SELECT COUNT(*) as count FROM leave_requests WHERE status = 'Approved'",
    rejectedRequests: "SELECT COUNT(*) as count FROM leave_requests WHERE status = 'Rejected'",
    totalUsers: 'SELECT COUNT(*) as count FROM users WHERE role = "user"'
  };
  
  const stats = {};
  let completed = 0;
  
  for (const [key, query] of Object.entries(queries)) {
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ message: `Error fetching ${key}`, error: err.message });
      }
      stats[key] = results[0].count;
      completed++;
      
      if (completed === Object.keys(queries).length) {
        res.json(stats);
      }
    });
  }
};
