import { createContext, useContext, useMemo, useReducer } from 'react'
import { mockTasks } from '../data/mockTasks'
import { TASK_ACTIONS, taskReducer } from '../reducers/taskReducer'

const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, mockTasks)

  const value = useMemo(
    () => ({
      tasks,
      addTask: (task) => dispatch({ type: TASK_ACTIONS.ADDED, payload: task }),
      deleteTask: (taskId) =>
        dispatch({ type: TASK_ACTIONS.DELETED, payload: taskId }),
      moveTask: (taskId, direction) =>
        dispatch({
          type: TASK_ACTIONS.MOVED,
          payload: { id: taskId, direction },
        }),
    }),
    [tasks],
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