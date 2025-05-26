const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/auth')
const {
    createBoardHandler,
    addTaskColumnHandler,
    addTaskToAColumnHandler,
    moveTaskHandler,
    editTaskHandler,
    deleteTaskHandler,
    getBoardById
}
    = require('../controllers/taskController')

router.post('/boards/:projectId', verifyToken, createBoardHandler)
router.post('/boards/:boardId/columns', verifyToken, addTaskColumnHandler)
router.get('/boards/:id', verifyToken, getBoardById);
router.post('/columns/:columnId/tasks', verifyToken, addTaskToAColumnHandler)
router.put('/tasks/:taskId/move', verifyToken, moveTaskHandler)
router.put('/tasks/:taskId/edit', verifyToken, editTaskHandler)
router.delete('/tasks/:taskId/delete', verifyToken, deleteTaskHandler)

module.exports = router;