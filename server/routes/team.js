const express = require('express');
const router = express.Router()
const { verifyToken } = require('../middleware/auth')
const { createTeamHandler, inviteMemberHandler } = require('../controllers/teamController')

router.post('/create', verifyToken, createTeamHandler)
router.post('/:teamId/invite', verifyToken, inviteMemberHandler)

module.exports = router;