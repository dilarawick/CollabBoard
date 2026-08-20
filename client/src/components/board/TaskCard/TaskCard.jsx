import { Link } from 'react-router-dom'
import { COLUMNS } from '../../../constants/columns'
import { useTasks } from '../../../context/TaskContext'
import Button from '../../ui/Button/Button'

function getInitials(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
}

function isOverdue(dueDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(`${dueDate}T00:00:00`) < today
}

function TaskCard({ task }) {
  const { deleteTask, moveTask } = useTasks()

  const columnIndex = COLUMNS.indexOf(task.status)
  const canMoveLeft = columnIndex > 0
  const canMoveRight = columnIndex < COLUMNS.length - 1
  const overdue = isOverdue(task.dueDate)

  return (
    <article className="task-card">
      <h3 className="task-card__title">
        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
      </h3>
      <div className="task-card__meta">
        <span className="task-card__assignee">
          <span className="task-card__avatar" aria-hidden="true">
            {getInitials(task.assignee)}
          </span>
          {task.assignee}
        </span>
        <span
          className={`task-card__due${overdue ? ' task-card__due--overdue' : ''}`}
        >
          {overdue ? 'Overdue:' : 'Due:'}
          {task.dueDate}
        </span>
      </div>
      <div className="task-card__actions">
        <Button
          variant="secondary"
          className="btn--icon"
          onClick={() => moveTask(task.id, -1)}
          disabled={!canMoveLeft}
          aria-label="Move left"
          title="Move left"
        >
          ←
        </Button>
        <Button
          variant="secondary"
          className="btn--icon"
          onClick={() => moveTask(task.id, 1)}
          disabled={!canMoveRight}
          aria-label="Move right"
          title="Move right"
        >
          →
        </Button>
        <Button
          variant="danger"
          className="btn--icon"
          onClick={() => deleteTask(task.id)}
          aria-label="Delete task"
          title="Delete"
        >
          ✕
        </Button>
      </div>
    </article>
  )
}

export default TaskCard
