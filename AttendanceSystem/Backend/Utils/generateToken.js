const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Generate JWT token
const generateToken = (id, name, email, role) => {
  return jwt.sign(
    { id, name, email, role },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

module.exports = { generateToken };
