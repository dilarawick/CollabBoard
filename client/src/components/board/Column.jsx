export default function Column({ title, status, children }) {
  const items = children.filter(task => task.status === status)
  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>
      <div className="column-cards">
        {items.map(task => (
          <div key={task.id} className="column-card-wrapper">
            {children.find(t => t.id === task.id)}
          </div>
        ))}
      </div>
    </div>
  )
}
