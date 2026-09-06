// Handles HTTP requests for task management operations

const tasksService = require('../services/tasksService');

// Get all tasks
async function getTasks(req, res) {
  try {
    const tasks = await tasksService.listTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create a new task
async function createTask(req, res) {
  try {
    const task = await tasksService.addTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update an existing task
async function updateTask(req, res) {
  try {
    const task = await tasksService.modifyTask(req.params.id, req.body);

    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// Delete a task
async function deleteTask(req, res) {
  try {
    await tasksService.removeTask(req.params.id);

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// Export all controller functions
module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};