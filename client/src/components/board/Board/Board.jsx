import { COLUMNS, FILTER_ALL } from '../../../constants/columns'
import { useFilter } from '../../../context/FilterContext'
import { useTasks } from '../../../context/TaskContext'
import AddTaskForm from '../AddTaskForm/AddTaskForm'
import BoardCounter from '../BoardCounter/BoardCounter'
import Column from '../Column/Column'
import FilterBar from '../FilterBar/FilterBar'
import TaskCard from '../TaskCard/TaskCard'

function Board() {
  const { tasks } = useTasks()
  const { statusFilter } = useFilter()

  const visibleColumns =
    statusFilter === FILTER_ALL ? COLUMNS : [statusFilter]

  return (
    <div className="board-container">
      <div className="board-toolbar">
        <div className="board-toolbar__top">
          <div className="board-toolbar__heading">
            <h2 className="board-toolbar__title">Project Board</h2>
            <p className="board-toolbar__subtitle">
              Track tasks across To Do, In Progress, and Done
            </p>
          </div>
          <BoardCounter />
        </div>
        <div className="board-toolbar__controls">
          <FilterBar />
          <AddTaskForm />
        </div>
      </div>

      <div className="board">
        {visibleColumns.map((status) => {
          const columnTasks = tasks.filter((task) => task.status === status)

          return (
            <Column key={status} title={status}>
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </Column>
          )
        })}
      </div>
    </div>
  )
}

export default Board
