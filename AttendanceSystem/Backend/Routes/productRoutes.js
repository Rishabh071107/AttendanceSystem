const express = require('express');
const router = express.Router();
const { verifyToken } = require('../Middlewares/auth');
const upload = require('../Middlewares/uploads');

// Sample product routes (can be customized for your needs)

// Get all products
router.get('/', (req, res) => {
  res.json({ message: 'Products endpoint - customize for your needs' });
});

// Get product by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Product ${req.params.id}` });
});

// Create product (with file upload)
router.post('/', verifyToken, upload.single('image'), (req, res) => {
  res.json({ message: 'Product created successfully' });
});

// Update product
router.put('/:id', verifyToken, (req, res) => {
  res.json({ message: 'Product updated successfully' });
});

// Delete product
router.delete('/:id', verifyToken, (req, res) => {
  res.json({ message: 'Product deleted successfully' });
});

module.exports = router;
