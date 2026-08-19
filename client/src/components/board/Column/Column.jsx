import { Children } from 'react'

const COLUMN_MODIFIERS = {
  'To Do': 'todo',
  'In Progress': 'progress',
  Done: 'done',
}

function Column({ title, children }) {
  const taskCount = Children.count(children)
  const modifier = COLUMN_MODIFIERS[title] ?? 'todo'

  return (
    <section className={`column column--${modifier}`}>
      <header className="column__header">
        <span className="column__dot" aria-hidden="true" />
        <h2 className="column__title">{title}</h2>
        <span className="column__count">{taskCount}</span>
      </header>
      <div className="column__tasks">
        {taskCount === 0 ? (
          <div className="column__empty">
            <span className="column__empty-icon" aria-hidden="true">
              ◻
            </span>
            <span>No tasks yet</span>
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  )
}

export default Column
