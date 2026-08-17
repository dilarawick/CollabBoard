import Button from '../common/Button.jsx'

export default function TaskCard({ task, onDelete, onMove }) {
  return (
    <div className="task-card">
      <div className="task-header">
        <span className="task-title">{task.title}</span>
        <button className="task-delete" onClick={() => onDelete(task.id)} aria-label="Delete task">
          ×
        </button>
      </div>
      <div className="task-meta">
        <span>{task.assignee}</span>
        <span>{task.dueDate}</span>
      </div>
      <div className="task-actions">
        <Button variant="secondary" onClick={() => onMove(task.id, -1)} disabled={task.status === 'todo'}>
          ← Move left
        </Button>
        <Button variant="secondary" onClick={() => onMove(task.id, 1)} disabled={task.status === 'done'}>
          Move right →
        </Button>
      </div>
    </div>
  )
}
