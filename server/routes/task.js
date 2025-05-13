const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/auth')
const {
    createBoardHandler,
    addTaskColumnHandler,
    addTaskToAColumnHandler,
    moveTaskHandler,
    editTaskHandler,
    deleteTaskHandler
}
    = require('../controllers/taskController')

router.post('/boards/:projectId', verifyToken, createBoardHandler)
router.post('/boards/:boardId/columns', verifyToken, addTaskColumnHandler)
router.post('/columns/:columnId/tasks', verifyToken, addTaskToAColumnHandler)
router.put('/tasks/:taskId/move', verifyToken, moveTaskHandler)
router.put('/tasks/:taskId', verifyToken, editTaskHandler)
router.delete('/tasks/:taskId', verifyToken, deleteTaskHandler)

module.exports = router;