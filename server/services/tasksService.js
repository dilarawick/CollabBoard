const tasksRepository = require('../repositories/tasksRepository')

async function listTasks() {
  return tasksRepository.getAllTasks()
}

async function getTask(id) {
  return tasksRepository.getTaskById(id)
}

async function addTask(taskData) {
  if (!taskData.title) {
    throw new Error('Missing required fields')
  }
  return tasksRepository.createTask(taskData)
}

async function modifyTask(id, updates) {
  const existing = await tasksRepository.getTaskById(id)
  if (!existing) {
    throw new Error('Task not found')
  }
  return tasksRepository.updateTask(id, updates)
}

async function removeTask(id) {
  const existing = await tasksRepository.getTaskById(id)
  if (!existing) {
    throw new Error('Task not found')
  }
  return tasksRepository.deleteTask(id)
}

module.exports = {
  listTasks,
  getTask,
  addTask,
  modifyTask,
  removeTask
}
