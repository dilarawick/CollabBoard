import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('../../../../client/src/context/TaskContext', () => ({
  useTasks: jest.fn(),
}))

jest.mock('../../../../client/src/context/FilterContext', () => ({
  useFilter: jest.fn(),
}))

import BoardCounter from '../../../../client/src/components/board/BoardCounter/BoardCounter'
import { useTasks } from '../../../../client/src/context/TaskContext'
import { useFilter } from '../../../../client/src/context/FilterContext'

describe('BoardCounter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should show progress for all tasks', () => {
    useTasks.mockReturnValue({
      tasks: [
        { id: '1', status: 'To Do' },
        { id: '2', status: 'Done' },
        { id: '3', status: 'Done' },
        { id: '4', status: 'In Progress' },
      ],
    })

    useFilter.mockReturnValue({
      statusFilter: 'all',
    })

    render(<BoardCounter />)

    expect(screen.getByText('2 / 4 done')).toBeInTheDocument()

    const progressBar = screen.getByRole('progressbar')

    expect(progressBar).toHaveAttribute('aria-valuenow', '50')
    expect(progressBar).toHaveAttribute(
      'aria-label',
      '2 of 4 tasks done'
    )
  })

  test('should calculate progress using filtered tasks', () => {
    useTasks.mockReturnValue({
      tasks: [
        { id: '1', status: 'To Do' },
        { id: '2', status: 'Done' },
        { id: '3', status: 'Done' },
      ],
    })

    useFilter.mockReturnValue({
      statusFilter: 'Done',
    })

    render(<BoardCounter />)

    expect(screen.getByText('2 / 2 done')).toBeInTheDocument()

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100'
    )
  })

  test('should show zero progress when there are no tasks', () => {
    useTasks.mockReturnValue({
      tasks: [],
    })

    useFilter.mockReturnValue({
      statusFilter: 'all',
    })

    render(<BoardCounter />)

    expect(screen.getByText('0 / 0 done')).toBeInTheDocument()

    const progressBar = screen.getByRole('progressbar')

    expect(progressBar).toHaveAttribute('aria-valuenow', '0')
    expect(progressBar).toHaveAttribute(
      'aria-label',
      '0 of 0 tasks done'
    )
  })

  test('should show zero completed tasks when none are done', () => {
    useTasks.mockReturnValue({
      tasks: [
        { id: '1', status: 'To Do' },
        { id: '2', status: 'In Progress' },
      ],
    })

    useFilter.mockReturnValue({
      statusFilter: 'all',
    })

    render(<BoardCounter />)

    expect(screen.getByText('0 / 2 done')).toBeInTheDocument()

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '0'
    )
  })
})