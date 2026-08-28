import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { TASK_ACTIONS, taskReducer } from '../reducers/taskReducer'
import * as api from '../services/api'

const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await api.fetchTasks()
        setTasks(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  const addTask = async (task) => {
    const created = await api.createTask(task)
    setTasks((prev) => [...prev, created])
  }

  const deleteTask = async (taskId) => {
    await api.deleteTask(taskId)
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const moveTask = async (taskId, direction) => {
    const task = tasks.find((item) => item.id === taskId)
    if (!task) return

    const statuses = ['To Do', 'In Progress', 'Done']
    const currentIndex = statuses.indexOf(task.status)
    const nextIndex = currentIndex + direction

    if (nextIndex < 0 || nextIndex >= statuses.length) {
      return
    }

    const updated = await api.updateTask(taskId, { status: statuses[nextIndex] })
    setTasks((prev) => prev.map((item) => (item.id === taskId ? updated : item)))
  }

  const value = useMemo(
    () => ({
      tasks,
      loading,
      error,
      addTask,
      deleteTask,
      moveTask,
    }),
    [tasks, loading, error],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider')
  }

  return context
}
