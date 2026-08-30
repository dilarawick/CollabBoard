// Handles HTTP requests for task management operations
// Import tasks service for business logic
const tasksService = require('../services/tasksService')

// Get all tasks
function getTasks(req, res) {
  const tasks = tasksService.listTasks()
  res.status(200).json(tasks)
}

// Create a new task
function createTask(req, res) {
  try {
    const task = tasksService.addTask(req.body)
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Update an existing task
function updateTask(req, res) {
  try {
    const task = tasksService.modifyTask(req.params.id, req.body)
    res.status(200).json(task)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// Delete a task
function deleteTask(req, res) {
  try {
    tasksService.removeTask(req.params.id)
    res.status(200).json({ message: 'Task deleted' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// Export all controller functions
module.exports = { getTasks, createTask, updateTask, deleteTask }
