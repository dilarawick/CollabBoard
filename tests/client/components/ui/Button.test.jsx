import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import Button from '../../../../client/src/components/ui/Button/Button'

describe('Button', () => {
  test('should render button text', () => {
    render(<Button>Save</Button>)

    expect(
      screen.getByRole('button', { name: 'Save' })
    ).toBeInTheDocument()
  })

  test('should use primary variant by default', () => {
    render(<Button>Save</Button>)

    expect(
      screen.getByRole('button', { name: 'Save' })
    ).toHaveClass('btn', 'btn--primary')
  })

  test('should apply a custom variant', () => {
    render(
      <Button variant="danger">
        Delete
      </Button>
    )

    expect(
      screen.getByRole('button', { name: 'Delete' })
    ).toHaveClass('btn--danger')
  })

  test('should apply custom className', () => {
    render(
      <Button className="custom-button">
        Custom
      </Button>
    )

    expect(
      screen.getByRole('button', { name: 'Custom' })
    ).toHaveClass('custom-button')
  })

  test('should use button type by default', () => {
    render(<Button>Default Button</Button>)

    expect(
      screen.getByRole('button', { name: 'Default Button' })
    ).toHaveAttribute('type', 'button')
  })

  test('should allow custom button type', () => {
    render(
      <Button type="submit">
        Submit
      </Button>
    )

    expect(
      screen.getByRole('button', { name: 'Submit' })
    ).toHaveAttribute('type', 'submit')
  })

  test('should call onClick when clicked', () => {
    const handleClick = jest.fn()

    render(
      <Button onClick={handleClick}>
        Click Me
      </Button>
    )

    fireEvent.click(
      screen.getByRole('button', { name: 'Click Me' })
    )

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('should pass additional props to the button', () => {
    render(
      <Button
        disabled
        aria-label="Disabled button"
        title="Disabled"
      >
        Disabled
      </Button>
    )

    const button = screen.getByRole('button', {
      name: 'Disabled button',
    })

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('title', 'Disabled')
  })
})