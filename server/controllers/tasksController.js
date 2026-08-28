const tasksService = require('../services/tasksService')

function getTasks(req, res) {
  const tasks = tasksService.listTasks()
  res.status(200).json(tasks)
}

function createTask(req, res) {
  try {
    const task = tasksService.addTask(req.body)
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

function updateTask(req, res) {
  try {
    const task = tasksService.modifyTask(req.params.id, req.body)
    res.status(200).json(task)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

function deleteTask(req, res) {
  try {
    tasksService.removeTask(req.params.id)
    res.status(200).json({ message: 'Task deleted' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

module.exports = { getTasks, createTask, updateTask, deleteTask }
