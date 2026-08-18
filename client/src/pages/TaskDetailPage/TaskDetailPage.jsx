import { Link, useNavigate, useParams } from 'react-router-dom'
import { COLUMNS } from '../../constants/columns'
import { useTasks } from '../../context/TaskContext'
import Button from '../../components/ui/Button/Button'

const STATUS_BADGE = {
  'To Do': 'todo',
  'In Progress': 'progress',
  Done: 'done',
}

function TaskDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tasks, deleteTask, moveTask } = useTasks()

  const task = tasks.find((item) => item.id === id)

  if (!task) {
    return (
      <section className="task-detail task-detail--missing">
        <div className="task-detail__card">
          <h2>Task not found</h2>
          <p>No task exists with id &quot;{id}&quot;.</p>
          <div className="task-detail__actions">
            <Button onClick={() => navigate('/')}>Back to board</Button>
          </div>
        </div>
      </section>
    )
  }

  const columnIndex = COLUMNS.indexOf(task.status)
  const canMoveLeft = columnIndex > 0
  const canMoveRight = columnIndex < COLUMNS.length - 1
  const badgeClass = STATUS_BADGE[task.status] ?? 'todo'

  function handleDelete() {
    deleteTask(task.id)
    navigate('/')
  }

  return (
    <section className="task-detail">
      <div className="task-detail__card">
        <p className="task-detail__breadcrumb">
          <Link to="/">Board</Link> / {task.title}
        </p>
        <h2>{task.title}</h2>
        <span
          className={`task-detail__status-badge task-detail__status-badge--${badgeClass}`}
        >
          {task.status}
        </span>
        <dl className="task-detail__meta">
          <div>
            <dt>Assignee</dt>
            <dd>{task.assignee}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{task.status}</dd>
          </div>
          <div>
            <dt>Due date</dt>
            <dd>{task.dueDate}</dd>
          </div>
          <div>
            <dt>Task ID</dt>
            <dd>{task.id}</dd>
          </div>
        </dl>
        <div className="task-detail__actions">
          <Button
            variant="secondary"
            onClick={() => moveTask(task.id, -1)}
            disabled={!canMoveLeft}
          >
            ← Move left
          </Button>
          <Button
            variant="secondary"
            onClick={() => moveTask(task.id, 1)}
            disabled={!canMoveRight}
          >
            Move right →
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Back to board
          </Button>
        </div>
      </div>
    </section>
  )
}

export default TaskDetailPage