import { COLUMNS, FILTER_ALL } from '../../../constants/columns'
import { useFilter } from '../../../context/FilterContext'
import Button from '../../ui/Button/Button'

function FilterBar() {
  const { statusFilter, setStatusFilter } = useFilter()

  return (
    <div className="filter-bar">
      <span className="filter-bar__label">Show:</span>
      <Button
        variant={statusFilter === FILTER_ALL ? 'primary' : 'secondary'}
        onClick={() => setStatusFilter(FILTER_ALL)}
      >
        All columns
      </Button>
      {COLUMNS.map((status) => (
        <Button
          key={status}
          variant={statusFilter === status ? 'primary' : 'secondary'}
          onClick={() => setStatusFilter(status)}
        >
          {status}
        </Button>
      ))}
    </div>
  )
}

export default FilterBar
