const express = require('express');
const router = express.Router()
const { verifyToken } = require('../middleware/auth')
const { createProjectHandler, assignProjectHandler } = require('../controllers/projectController')

router.post('/create', verifyToken, createProjectHandler)
router.post('/:projectId/assign', verifyToken, assignProjectHandler)

module.exports = router;