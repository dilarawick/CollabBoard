import { COLUMNS } from '../constants/columns'

export const TASK_ACTIONS = {
  ADDED: 'added',
  DELETED: 'deleted',
  MOVED: 'moved',
}

export function taskReducer(tasks, action) {
  switch (action.type) {
    case TASK_ACTIONS.ADDED:
      return [...tasks, action.payload]

    case TASK_ACTIONS.DELETED:
      return tasks.filter((task) => task.id !== action.payload)

    case TASK_ACTIONS.MOVED:
      return tasks.map((task) => {
        if (task.id !== action.payload.id) {
          return task
        }

        const columnIndex = COLUMNS.indexOf(task.status)
        const nextIndex = columnIndex + action.payload.direction

        if (nextIndex < 0 || nextIndex >= COLUMNS.length) {
          return task
        }

        return { ...task, status: COLUMNS[nextIndex] }
      })

    default:
      return tasks
  }
}
