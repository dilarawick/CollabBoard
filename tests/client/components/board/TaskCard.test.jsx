import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

jest.mock('../../../../client/src/context/TaskContext', () => ({
  useTasks: jest.fn(),
}))

import TaskCard from '../../../../client/src/components/board/TaskCard/TaskCard'
import { useTasks } from '../../../../client/src/context/TaskContext'

describe('TaskCard', () => {
  const deleteTask = jest.fn()
  const moveTask = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    useTasks.mockReturnValue({
      deleteTask,
      moveTask,
    })
  })

  const renderTaskCard = (task) => {
    return render(
      <MemoryRouter>
        <TaskCard task={task} />
      </MemoryRouter>
    )
  }

  test('should render task details', () => {
    const task = {
      id: '1',
      title: 'Create login page',
      assignee: 'John Smith',
      dueDate: '2099-12-31',
      status: 'To Do',
    }

    renderTaskCard(task)

    expect(screen.getByText('Create login page')).toBeInTheDocument()
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('JS')).toBeInTheDocument()
    expect(screen.getByText(/2099-12-31/)).toBeInTheDocument()
  })

  test('should link task title to task details page', () => {
    const task = {
      id: '25',
      title: 'Test task',
      assignee: 'Jane Doe',
      dueDate: '2099-12-31',
      status: 'To Do',
    }

    renderTaskCard(task)

    expect(screen.getByRole('link', { name: 'Test task' }))
      .toHaveAttribute('href', '/tasks/25')
  })

  test('should display assignee initials', () => {
    const task = {
      id: '1',
      title: 'Test task',
      assignee: 'John Smith',
      dueDate: '2099-12-31',
      status: 'To Do',
    }

    renderTaskCard(task)

    expect(screen.getByText('JS')).toBeInTheDocument()
  })

  test('should mark a past due date as overdue', () => {
    const task = {
      id: '1',
      title: 'Old task',
      assignee: 'John Smith',
      dueDate: '2000-01-01',
      status: 'To Do',
    }

    const { container } = renderTaskCard(task)

    expect(screen.getByText(/Overdue:/)).toBeInTheDocument()

    expect(
      container.querySelector('.task-card__due--overdue')
    ).toBeInTheDocument()
  })

  test('should not mark a future due date as overdue', () => {
    const task = {
      id: '1',
      title: 'Future task',
      assignee: 'John Smith',
      dueDate: '2099-12-31',
      status: 'To Do',
    }

    const { container } = renderTaskCard(task)

    expect(screen.getByText(/Due:/)).toBeInTheDocument()

    expect(
      container.querySelector('.task-card__due--overdue')
    ).not.toBeInTheDocument()
  })

  test('should disable move left for a To Do task', () => {
    const task = {
      id: '1',
      title: 'Test task',
      assignee: 'John Smith',
      dueDate: '2099-12-31',
      status: 'To Do',
    }

    renderTaskCard(task)

    expect(
      screen.getByRole('button', { name: 'Move left' })
    ).toBeDisabled()

    expect(
      screen.getByRole('button', { name: 'Move right' })
    ).not.toBeDisabled()
  })

  test('should disable move right for a Done task', () => {
    const task = {
      id: '1',
      title: 'Test task',
      assignee: 'John Smith',
      dueDate: '2099-12-31',
      status: 'Done',
    }

    renderTaskCard(task)

    expect(
      screen.getByRole('button', { name: 'Move left' })
    ).not.toBeDisabled()

    expect(
      screen.getByRole('button', { name: 'Move right' })
    ).toBeDisabled()
  })

  test('should move task to the right', () => {
    const task = {
      id: '10',
      title: 'Test task',
      assignee: 'John Smith',
      dueDate: '2099-12-31',
      status: 'To Do',
    }

    renderTaskCard(task)

    fireEvent.click(
      screen.getByRole('button', { name: 'Move right' })
    )

    expect(moveTask).toHaveBeenCalledWith('10', 1)
  })

  test('should move task to the left', () => {
    const task = {
      id: '10',
      title: 'Test task',
      assignee: 'John Smith',
      dueDate: '2099-12-31',
      status: 'In Progress',
    }

    renderTaskCard(task)

    fireEvent.click(
      screen.getByRole('button', { name: 'Move left' })
    )

    expect(moveTask).toHaveBeenCalledWith('10', -1)
  })

  test('should delete the task', () => {
    const task = {
      id: '15',
      title: 'Delete me',
      assignee: 'John Smith',
      dueDate: '2099-12-31',
      status: 'To Do',
    }

    renderTaskCard(task)

    fireEvent.click(
      screen.getByRole('button', { name: 'Delete task' })
    )

    expect(deleteTask).toHaveBeenCalledWith('15')
  })
})