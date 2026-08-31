import { tasks, users } from '../mockdata/index.js'

const tasksList = tasks.map((task) => {
  const user = users.find((u) => u._id === task.assigneeId)
  return {
    id: task._id,
    title: task.title,
    assignee: user ? user.name : 'Unassigned',
    status: task.status === 'Review' ? 'In Progress' : task.status === 'Planned' ? 'To Do' : task.status,
    dueDate: task.dueDate instanceof Date ? task.dueDate.toISOString().split('T')[0] : task.dueDate,
  }
})

export function getAllTasks() {
  return tasksList
}

export function getTaskById(id) {
  return tasksList.find((task) => task.id === id)
}

export function createTask(taskData) {
  const newTask = {
    id: Date.now().toString(),
    title: taskData.title,
    assignee: taskData.assignee,
    status: taskData.status || 'To Do',
    dueDate: taskData.dueDate,
  }
  tasksList.push(newTask)
  return newTask
}

export function updateTask(id, updates) {
  const index = tasksList.findIndex((task) => task.id === id)
  if (index === -1) return null
  tasksList[index] = { ...tasksList[index], ...updates }
  return tasksList[index]
}

export function deleteTask(id) {
  const index = tasksList.findIndex((task) => task.id === id)
  if (index === -1) return false
  tasksList.splice(index, 1)
  return true
}
