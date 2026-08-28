import * as tasksRepository from '../repositories/tasksRepository.js'

export function listTasks() {
  return tasksRepository.getAllTasks()
}

export function getTask(id) {
  return tasksRepository.getTaskById(id)
}

export function addTask(taskData) {
  if (!taskData.title || !taskData.assignee || !taskData.dueDate) {
    throw new Error('Missing required fields')
  }
  return tasksRepository.createTask(taskData)
}

export function modifyTask(id, updates) {
  const existing = tasksRepository.getTaskById(id)
  if (!existing) {
    throw new Error('Task not found')
  }
  return tasksRepository.updateTask(id, updates)
}

export function removeTask(id) {
  const existing = tasksRepository.getTaskById(id)
  if (!existing) {
    throw new Error('Task not found')
  }
  return tasksRepository.deleteTask(id)
}
