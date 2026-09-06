import { tasks, users } from '../mockdata/index.js'

// Normalize mock task records into a lightweight in-memory list that the app can query.
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

// Read operations

export function getAllTasks() {
  // Return the full in-memory task list for the board.
  return tasksList
}

export function getTaskById(id) {
  // Fetch a single task by its unique identifier.
  return tasksList.find((task) => task.id === id)
}

// Write operations
export function createTask(taskData) {
  // Add a new task to the list with a generated identifier.
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
  // Merge updates into the matching task and return the updated record.
  const index = tasksList.findIndex((task) => task.id === id)
  if (index === -1) return null
  tasksList[index] = { ...tasksList[index], ...updates }
  return tasksList[index]
}

export function deleteTask(id) {
  // Remove a task by id and confirm whether anything was deleted.
  const index = tasksList.findIndex((task) => task.id === id)
  if (index === -1) return false
  tasksList.splice(index, 1)
  return true
}
