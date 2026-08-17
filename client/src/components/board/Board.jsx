import Column from './Column.jsx'
import TaskCard from './TaskCard.jsx'
import AddTaskForm from './AddTaskForm.jsx'
import { useBoard } from '../../context/BoardContext.jsx'

export default function Board() {
  const { tasks, addTask, moveTask, deleteTask, doneCount, total } = useBoard()

  return (
    <div className="board">
      <div className="board-header">
        <h1>CollabBoard</h1>
        <span className="board-counter">{doneCount} of {total} done</span>
      </div>
      <AddTaskForm onAdd={addTask} />
      <div className="board-columns">
        <Column title="To Do" status="todo" tasks={tasks}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onDelete={deleteTask} onMove={moveTask} />
          ))}
        </Column>
        <Column title="In Progress" status="inProgress" tasks={tasks}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onDelete={deleteTask} onMove={moveTask} />
          ))}
        </Column>
        <Column title="Done" status="done" tasks={tasks}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onDelete={deleteTask} onMove={moveTask} />
          ))}
        </Column>
      </div>
    </div>
  )
}
