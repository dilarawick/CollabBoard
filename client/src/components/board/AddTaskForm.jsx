import { useState } from 'react'
import Button from '../common/Button.jsx'

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim())
    setTitle('')
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task title..."
        className="add-task-input"
      />
      <Button type="submit" variant="primary">Add Task</Button>
    </form>
  )
}
