import { useState } from 'react'
import { useTasks } from '../../../context/TaskContext'
import Button from '../../ui/Button/Button'

const initialForm = { title: '', assignee: '', dueDate: '' }

function AddTaskForm() {
  const { addTask } = useTasks()
  const [form, setForm] = useState(initialForm)
  const [isOpen, setIsOpen] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!form.title.trim() || !form.assignee.trim() || !form.dueDate) {
      return
    }

    addTask({
      id: crypto.randomUUID(),
      title: form.title.trim(),
      assignee: form.assignee.trim(),
      status: 'To Do',
      dueDate: form.dueDate,
    })

    setForm(initialForm)
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <Button
        className="add-task-toggle"
        onClick={() => setIsOpen(true)}
      >
        + New task
      </Button>
    )
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <div className="add-task-form__header">
        <h2 className="add-task-form__title">Create task</h2>
        <Button
          type="button"
          variant="ghost"
          className="btn--icon"
          onClick={() => setIsOpen(false)}
          aria-label="Close form"
        >
          ✕
        </Button>
      </div>
      <div className="add-task-form__fields">
        <label className="add-task-form__field">
          Title
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            required
            autoFocus
          />
        </label>
        <label className="add-task-form__field">
          Assignee
          <input
            type="text"
            name="assignee"
            value={form.assignee}
            onChange={handleChange}
            placeholder="Team member name"
            required
          />
        </label>
        <label className="add-task-form__field">
          Due date
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="add-task-form__actions">
        <Button type="submit">Add to To Do</Button>
      </div>
    </form>
  )
}

export default AddTaskForm
