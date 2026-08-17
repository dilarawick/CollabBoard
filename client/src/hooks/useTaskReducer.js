export function taskReducer(state, action) {
  switch (action.type) {
    case 'ADDED':
      return [...state, action.payload]
    case 'MOVED': {
      const { id, direction } = action.payload
      return state.map(task => {
        if (task.id !== id) return task
        const order = ['todo', 'inProgress', 'done']
        const idx = order.indexOf(task.status)
        const next = order[idx + direction]
        return next ? { ...task, status: next } : task
      })
    }
    case 'DELETED':
      return state.filter(t => t.id !== action.payload.id)
    default:
      return state
  }
}
