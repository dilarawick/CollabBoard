const mongoose = require('mongoose')
const Task = require('../models/Task')
const Board = require('../models/Board')
const User = require('../models/User')
const { tasks: mockTasks, users: mockUsers } = require('../mockdata')

let tasksList = mockTasks.map((task) => {
  const user = mockUsers.find((u) => u._id === task.assigneeId)
  return {
    id: task._id,
    title: task.title,
    assignee: user ? user.name : 'Unassigned',
    status: task.status === 'Review' ? 'In Progress' : task.status === 'Planned' ? 'To Do' : task.status,
    dueDate: task.dueDate instanceof Date ? task.dueDate.toISOString().split('T')[0] : task.dueDate,
  }
})

function isDbConnected() {
  return mongoose.connection.readyState === 1
}

function normalizeTask(task) {
  return {
    id: task._id.toString(),
    _id: task._id.toString(),
    title: task.title,
    assignee: task.assignee || 'Unassigned',
    status: task.status === 'Review' ? 'In Progress' : task.status === 'Planned' ? 'To Do' : task.status,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : null,
    boardId: task.boardId ? task.boardId.toString() : null,
    columnId: task.columnId ? task.columnId.toString() : null,
    description: task.description,
    priority: task.priority,
    position: task.position,
    version: task.version,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt
  }
}

async function getAllTasks() {
  if (isDbConnected()) {
    const tasks = await Task.find({}).lean()
    return tasks.map(normalizeTask)
  }
  return tasksList
}

async function getTaskById(id) {
  if (isDbConnected()) {
    const task = await Task.findById(id).lean()
    return task ? normalizeTask(task) : null
  }
  return tasksList.find((task) => task.id === id)
}

async function createTask(taskData) {
  let boardId = taskData.boardId
  let columnId = taskData.columnId

  if (isDbConnected()) {
    if (!boardId) {
      const board = await Board.findOne({})
      if (board) {
        boardId = board._id
        const statusColumn = board.columns.find((col) => col.title === (taskData.status || 'To Do'))
        if (statusColumn) {
          columnId = statusColumn._id
        } else if (board.columns.length > 0) {
          columnId = board.columns[0]._id
        }
      }
    }
  }

  const payload = {
    title: taskData.title || 'Untitled Task',
    assignee: taskData.assignee || 'Unassigned',
    status: taskData.status || 'To Do',
    dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
    priority: taskData.priority || 'medium',
    position: taskData.position || 0,
    boardId,
    columnId,
    description: taskData.description || ''
  }

  if (isDbConnected()) {
    const task = await Task.create(payload)
    return normalizeTask(task.toObject())
  }

  const newTask = {
    id: Date.now().toString(),
    ...payload,
    dueDate: payload.dueDate ? payload.dueDate.toISOString().split('T')[0] : null
  }
  tasksList.push(newTask)
  return newTask
}

async function updateTask(id, updates) {
  if (isDbConnected()) {
    const task = await Task.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    ).lean()
    return task ? normalizeTask(task) : null
  }

  const index = tasksList.findIndex((task) => task.id === id)
  if (index === -1) return null
  tasksList[index] = { ...tasksList[index], ...updates }
  return tasksList[index]
}

async function deleteTask(id) {
  if (isDbConnected()) {
    const result = await Task.findByIdAndDelete(id)
    return !!result
  }
  const index = tasksList.findIndex((task) => task.id === id)
  if (index === -1) return false
  tasksList.splice(index, 1)
  return true
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
}
