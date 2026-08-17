import { useParams, Link } from 'react-router-dom'
import { useBoard } from '../context/BoardContext.jsx'
import Button from '../components/common/Button.jsx'

export default function TaskDetailPage() {
  const { id } = useParams()
  const { tasks } = useBoard()
  const task = tasks.find(t => t.id === id)

  if (!task) {
    return (
      <div className="page">
        <h2>Task not found</h2>
        <Button variant="primary" as={Link} to="/">Back to Board</Button>
      </div>
    )
  }

  return (
    <div className="page">
      <h2>{task.title}</h2>
      <p><strong>Assignee:</strong> {task.assignee}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Due:</strong> {task.dueDate}</p>
      <Button variant="secondary" as={Link} to="/">Back to Board</Button>
    </div>
  )
}
