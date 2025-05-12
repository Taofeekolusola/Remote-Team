const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/member', verifyToken, (req, res) => {
  res.send(`Hello Member ${req.user.id}`);
});

router.get('/admin', verifyToken, requireRole('admin'), (req, res) => {
  res.send(`Hello Admin ${req.user.id}`);
});

module.exports = router;