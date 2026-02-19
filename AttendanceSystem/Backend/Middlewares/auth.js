const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  // Remove 'Bearer ' prefix if present
  const tokenString = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
  
  jwt.verify(tokenString, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Verify admin role
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};

// Verify user role
exports.isUser = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ message: 'Access denied. User only.' });
  }
  next();
};
