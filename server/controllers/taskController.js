const { Board, TaskColumn, Task, Project } = require('../models');

//Create Board
const createBoardHandler = async (req, res) => {
    try {
      const board = await Board.create({
        name: req.body.name,
        ProjectId: req.params.projectId,
      });
      res.json(board);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}
  
//Add Task Column To A Board
const addTaskColumnHandler = async (req, res) => {
    try {
      const column = await TaskColumn.create({
        name: req.body.name,
        order: req.body.order || 0,
        BoardId: req.params.boardId,
      });
      res.json(column);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

//Add Task To A Column
const addTaskToAColumnHandler = async (req, res) => {
    try {
      const task = await Task.create({
        ...req.body,
        TaskColumnId: req.params.columnId,
      });
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}
  
//Move Task To Another Column
const moveTaskHandler = async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.taskId);
      if (!task) return res.status(404).json({ error: 'Task not found' });
  
      task.TaskColumnId = req.body.newColumnId;
      task.order = req.body.newOrder;
      await task.save();
  
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}
  
//Edit Task 
const editTaskHandler = async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.taskId);
      if (!task) return res.status(404).json({ error: 'Task not found' });
  
      await task.update(req.body);
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}
  
//Delete Task
const deleteTaskHandler = async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.taskId);
      if (!task) return res.status(404).json({ error: 'Task not found' });
  
      await task.destroy();
      res.json({ message: 'Task deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}
  
module.exports = {
    createBoardHandler,
    addTaskColumnHandler,
    addTaskToAColumnHandler,
    moveTaskHandler,
    editTaskHandler,
    deleteTaskHandler,
}