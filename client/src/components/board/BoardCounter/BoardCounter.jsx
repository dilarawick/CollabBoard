import { FILTER_ALL } from '../../../constants/columns'
import { useFilter } from '../../../context/FilterContext'
import { useTasks } from '../../../context/TaskContext'

function BoardCounter() {
  const { tasks } = useTasks()
  const { statusFilter } = useFilter()

  const visibleTasks =
    statusFilter === FILTER_ALL
      ? tasks
      : tasks.filter((task) => task.status === statusFilter)

  const doneCount = visibleTasks.filter((task) => task.status === 'Done').length
  const totalCount = visibleTasks.length
  const progress = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100)

  return (
    <div className="board-counter">
      <div className="board-counter__label">
        <span>Progress</span>
        <span className="board-counter__fraction">
          {doneCount} / {totalCount} done
        </span>
      </div>
      <div
        className="board-counter__bar"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${doneCount} of ${totalCount} tasks done`}
      >
        <div
          className="board-counter__fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default BoardCounter
