import { createContext, useContext, useReducer } from 'react'
import { mockTasks } from '../data/mockTasks.js'
import { taskReducer } from '../hooks/useTaskReducer.js'

const BoardContext = createContext(null)

export function BoardProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, mockTasks)

  const addTask = (title) => {
    dispatch({
      type: 'ADDED',
      payload: {
        id: crypto.randomUUID(),
        title,
        assignee: 'Unassigned',
        status: 'todo',
        dueDate: new Date().toISOString().split('T')[0]
      }
    })
  }

  const moveTask = (id, direction) => {
    dispatch({ type: 'MOVED', payload: { id, direction } })
  }

  const deleteTask = (id) => {
    dispatch({ type: 'DELETED', payload: { id } })
  }

  const doneCount = tasks.filter(t => t.status === 'done').length

  return (
    <BoardContext.Provider value={{ tasks, addTask, moveTask, deleteTask, doneCount, total: tasks.length }}>
      {children}
    </BoardContext.Provider>
  )
}

export function useBoard() {
  const ctx = useContext(BoardContext)
  if (!ctx) throw new Error('useBoard must be used within BoardProvider')
  return ctx
}
