import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('../../../../client/src/context/TaskContext', () => ({
  useTasks: jest.fn(),
}))

jest.mock('../../../../client/src/context/FilterContext', () => ({
  useFilter: jest.fn(),
}))

jest.mock('../../../../client/src/components/board/AddTaskForm/AddTaskForm', () => {
  return function MockAddTaskForm() {
    return <div>Add Task Form</div>
  }
})

jest.mock('../../../../client/src/components/board/FilterBar/FilterBar', () => {
  return function MockFilterBar() {
    return <div>Filter Bar</div>
  }
})

jest.mock('../../../../client/src/components/board/BoardCounter/BoardCounter', () => {
  return function MockBoardCounter() {
    return <div>Board Counter</div>
  }
})

jest.mock('../../../../client/src/components/board/TaskCard/TaskCard', () => {
  return function MockTaskCard({ task }) {
    return <div data-testid="task-card">{task.title}</div>
  }
})

import Board from '../../../../client/src/components/board/Board/Board'
import { useTasks } from '../../../../client/src/context/TaskContext'
import { useFilter } from '../../../../client/src/context/FilterContext'

describe('Board', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render board heading and toolbar components', () => {
    useTasks.mockReturnValue({
      tasks: [],
    })

    useFilter.mockReturnValue({
      statusFilter: 'all',
    })

    render(<Board />)

    expect(screen.getByText('Project Board')).toBeInTheDocument()
    expect(
      screen.getByText('Track tasks across To Do, In Progress, and Done')
    ).toBeInTheDocument()

    expect(screen.getByText('Board Counter')).toBeInTheDocument()
    expect(screen.getByText('Filter Bar')).toBeInTheDocument()
    expect(screen.getByText('Add Task Form')).toBeInTheDocument()
  })

  test('should show all columns when filter is all', () => {
    useTasks.mockReturnValue({
      tasks: [],
    })

    useFilter.mockReturnValue({
      statusFilter: 'all',
    })

    render(<Board />)

    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  test('should show only selected column when a status filter is active', () => {
    useTasks.mockReturnValue({
      tasks: [],
    })

    useFilter.mockReturnValue({
      statusFilter: 'Done',
    })

    render(<Board />)

    expect(screen.getByText('Done')).toBeInTheDocument()
    expect(screen.queryByText('To Do')).not.toBeInTheDocument()
    expect(screen.queryByText('In Progress')).not.toBeInTheDocument()
  })

  test('should place tasks in their correct columns', () => {
    useTasks.mockReturnValue({
      tasks: [
        {
          id: '1',
          title: 'Task One',
          status: 'To Do',
        },
        {
          id: '2',
          title: 'Task Two',
          status: 'In Progress',
        },
        {
          id: '3',
          title: 'Task Three',
          status: 'Done',
        },
      ],
    })

    useFilter.mockReturnValue({
      statusFilter: 'all',
    })

    render(<Board />)

    expect(screen.getByText('Task One')).toBeInTheDocument()
    expect(screen.getByText('Task Two')).toBeInTheDocument()
    expect(screen.getByText('Task Three')).toBeInTheDocument()

    expect(screen.getAllByTestId('task-card')).toHaveLength(3)
  })

  test('should only render tasks matching the selected status', () => {
    useTasks.mockReturnValue({
      tasks: [
        {
          id: '1',
          title: 'Todo Task',
          status: 'To Do',
        },
        {
          id: '2',
          title: 'Done Task',
          status: 'Done',
        },
      ],
    })

    useFilter.mockReturnValue({
      statusFilter: 'Done',
    })

    render(<Board />)

    expect(screen.getByText('Done Task')).toBeInTheDocument()
    expect(screen.queryByText('Todo Task')).not.toBeInTheDocument()
  })
})