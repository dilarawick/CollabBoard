import React from 'react'
import { render, screen } from '@testing-library/react'
import Column from '../../../../client/src/components/board/Column/Column'

describe('Column', () => {
  test('should render the column title', () => {
    render(
      <Column title="To Do">
        <div>Task 1</div>
      </Column>
    )

    expect(screen.getByText('To Do')).toBeInTheDocument()
  })

  test('should display the correct number of tasks', () => {
    render(
      <Column title="In Progress">
        <div>Task 1</div>
        <div>Task 2</div>
      </Column>
    )

    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('should render child tasks', () => {
    render(
      <Column title="Done">
        <div>Completed Task</div>
      </Column>
    )

    expect(screen.getByText('Completed Task')).toBeInTheDocument()
  })

  test('should show empty message when there are no tasks', () => {
    render(<Column title="To Do" />)

    expect(screen.getByText('No tasks yet')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  test('should apply todo modifier class for To Do column', () => {
    const { container } = render(
      <Column title="To Do">
        <div>Task</div>
      </Column>
    )

    expect(
      container.querySelector('.column--todo')
    ).toBeInTheDocument()
  })

  test('should apply progress modifier class for In Progress column', () => {
    const { container } = render(
      <Column title="In Progress">
        <div>Task</div>
      </Column>
    )

    expect(
      container.querySelector('.column--progress')
    ).toBeInTheDocument()
  })

  test('should apply done modifier class for Done column', () => {
    const { container } = render(
      <Column title="Done">
        <div>Task</div>
      </Column>
    )

    expect(
      container.querySelector('.column--done')
    ).toBeInTheDocument()
  })

  test('should use todo modifier for an unknown column title', () => {
    const { container } = render(
      <Column title="Unknown">
        <div>Task</div>
      </Column>
    )

    expect(
      container.querySelector('.column--todo')
    ).toBeInTheDocument()
  })
})