const API_BASE =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Gets the JWT token from browser storage
function getAuthHeaders() {
  const token = localStorage.getItem('token')

  return token
    ? { Authorization: `Bearer ${token}` }
    : {}
}

// Get all tasks
export async function fetchTasks() {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'GET',
    headers: {
      ...getAuthHeaders()
    }
  })

  if (!res.ok) {
    const data = await res
      .json()
      .catch(() => ({ message: 'Failed to fetch tasks' }))

    throw new Error(data.message || 'Failed to fetch tasks')
  }

  return res.json()
}

// Create a task
export async function createTask(task) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(task)
  })

  if (!res.ok) {
    const data = await res
      .json()
      .catch(() => ({ message: 'Failed to create task' }))

    throw new Error(data.message || 'Failed to create task')
  }

  return res.json()
}

// Update a task
export async function updateTask(id, updates) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(updates)
  })

  if (!res.ok) {
    const data = await res
      .json()
      .catch(() => ({ message: 'Failed to update task' }))

    throw new Error(data.message || 'Failed to update task')
  }

  return res.json()
}

// Delete a task
export async function deleteTask(id) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders()
    }
  })

  if (!res.ok) {
    const data = await res
      .json()
      .catch(() => ({ message: 'Failed to delete task' }))

    throw new Error(data.message || 'Failed to delete task')
  }

  return res.json()
}
// Login
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    const data = await res
      .json()
      .catch(() => ({ message: 'Login failed' }))

    throw new Error(data.message || 'Login failed')
  }

  const data = await res.json()

  console.log('Login response:', data)

  localStorage.setItem('token', data.token)

  console.log('Saved token:', localStorage.getItem('token'))

  return data.user
}

// Signup
export async function signup(name, email, password) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })

  if (!res.ok) {
    const data = await res
      .json()
      .catch(() => ({ message: 'Signup failed' }))

    throw new Error(data.message || 'Signup failed')
  }

  return res.json()
}