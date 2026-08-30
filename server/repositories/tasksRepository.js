// Temporary in-memory task data used by the Tasks repository

let tasks = [
  { id: '1', title: 'Set up project repository', assignee: 'Alice', status: 'To Do', dueDate: '2026-08-20' },
  { id: '2', title: 'Design board wireframes', assignee: 'Bob', status: 'To Do', dueDate: '2026-08-22' },
  { id: '3', title: 'Write API documentation', assignee: 'Carol', status: 'To Do', dueDate: '2026-08-25' },
  { id: '4', title: 'Build TaskCard component', assignee: 'Dave', status: 'In Progress', dueDate: '2026-08-18' },
  { id: '5', title: 'Implement column layout', assignee: 'Eve', status: 'In Progress', dueDate: '2026-08-19' },
  { id: '6', title: 'Add mock task data', assignee: 'Frank', status: 'In Progress', dueDate: '2026-08-21' },
  { id: '7', title: 'Configure Vite dev server', assignee: 'Grace', status: 'Done', dueDate: '2026-08-10' },
  { id: '8', title: 'Create React app scaffold', assignee: 'Henry', status: 'Done', dueDate: '2026-08-12' },
  { id: '9', title: 'Review initial pull request', assignee: 'Ivy', status: 'Done', dueDate: '2026-08-14' },
]
// Returns all tasks currently stored in memory
export function getAllTasks() {
  return tasks
}

export function getTaskById(id) {
  return tasks.find((task) => task.id === id)
}

export function createTask(taskData) {
  const newTask = {
    id: Date.now().toString(),
    title: taskData.title,
    assignee: taskData.assignee,
    status: taskData.status || 'To Do',
    dueDate: taskData.dueDate,
  }
  tasks.push(newTask)
  return newTask
}

export function updateTask(id, updates) {
  const index = tasks.findIndex((task) => task.id === id)
  if (index === -1) return null
  tasks[index] = { ...tasks[index], ...updates }
  return tasks[index]
}

export function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id)
  if (index === -1) return false
  tasks.splice(index, 1)
  return true
}
