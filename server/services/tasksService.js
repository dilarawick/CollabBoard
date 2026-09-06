// Task Service - Member contribution

import * as tasksRepository from '../repositories/tasksRepository.js'

// Return all tasks for the board.
export function listTasks() {
  return tasksRepository.getAllTasks()
}

// Fetch a single task by its id.
export function getTask(id) {
  return tasksRepository.getTaskById(id)
}

// Create a new task after validating required fields.
export function addTask(taskData) {
  if (!taskData.title || !taskData.assignee || !taskData.dueDate) {
    throw new Error('Missing required fields')
  }
  return tasksRepository.createTask(taskData)
}

// Update a task only if it exists.
export function modifyTask(id, updates) {
  const existing = tasksRepository.getTaskById(id)
  if (!existing) {
    throw new Error('Task not found')
  }
  return tasksRepository.updateTask(id, updates)
}

// Delete a task only if it exists.
export function removeTask(id) {
  const existing = tasksRepository.getTaskById(id)
  if (!existing) {
    throw new Error('Task not found')
  }
  return tasksRepository.deleteTask(id)
}
