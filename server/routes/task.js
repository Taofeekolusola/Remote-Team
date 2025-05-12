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

router.post('/boards/:projectId', createBoardHandler)
router.post('/boards/:boardId/columns', addTaskColumnHandler)
router.post('/columns/:columnId/tasks', addTaskToAColumnHandler)
router.put('/tasks/:taskId/move', moveTaskHandler)
router.put('/tasks/:taskId', editTaskHandler)
router.delete('/tasks/:taskId', deleteTaskHandler)

module.exports = router;