import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'

jest.mock('../../../../client/src/context/UserContext', () => ({
  useUser: jest.fn(),
}))

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom')

  return {
    ...actual,
    useNavigate: jest.fn(),
  }
})

import UserProfile from '../../../../client/src/components/ui/UserProfile/UserProfile'
import { useUser } from '../../../../client/src/context/UserContext'

describe('UserProfile', () => {
  const logout = jest.fn()
  const navigate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    useNavigate.mockReturnValue(navigate)
  })

  test('should render nothing when there is no user', () => {
    useUser.mockReturnValue({
      user: null,
      logout,
    })

    const { container } = render(<UserProfile />)

    expect(container).toBeEmptyDOMElement()
  })

  test('should render user name, email, and initials', () => {
    useUser.mockReturnValue({
      user: {
        name: 'John Doe',
        email: 'john@example.com',
      },
      logout,
    })

    render(<UserProfile />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'JD' })
    ).toBeInTheDocument()
  })

  test('should open and close the profile menu', () => {
    useUser.mockReturnValue({
      user: {
        name: 'John Doe',
        email: 'john@example.com',
      },
      logout,
    })

    render(<UserProfile />)

    const avatarButton = screen.getByRole('button', { name: 'JD' })

    expect(
      screen.queryByText('View Profile')
    ).not.toBeInTheDocument()

    fireEvent.click(avatarButton)

    expect(screen.getByText('View Profile')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
    expect(avatarButton).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(avatarButton)

    expect(
      screen.queryByText('View Profile')
    ).not.toBeInTheDocument()
  })

  test('should navigate to app when View Profile is clicked', () => {
    useUser.mockReturnValue({
      user: {
        name: 'John Doe',
        email: 'john@example.com',
      },
      logout,
    })

    render(<UserProfile />)

    fireEvent.click(screen.getByRole('button', { name: 'JD' }))
    fireEvent.click(screen.getByText('View Profile'))

    expect(navigate).toHaveBeenCalledWith('/app')
  })

  test('should logout and navigate home when Logout is clicked', () => {
    useUser.mockReturnValue({
      user: {
        name: 'John Doe',
        email: 'john@example.com',
      },
      logout,
    })

    render(<UserProfile />)

    fireEvent.click(screen.getByRole('button', { name: 'JD' }))
    fireEvent.click(screen.getByText('Logout'))

    expect(logout).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/')
  })

  test('should close the menu when clicking outside', () => {
    useUser.mockReturnValue({
      user: {
        name: 'John Doe',
        email: 'john@example.com',
      },
      logout,
    })

    render(<UserProfile />)

    fireEvent.click(screen.getByRole('button', { name: 'JD' }))

    expect(screen.getByText('View Profile')).toBeInTheDocument()

    fireEvent.mouseDown(document.body)

    expect(
      screen.queryByText('View Profile')
    ).not.toBeInTheDocument()
  })
  test('should keep the menu open when clicking inside the profile', () => {
  useUser.mockReturnValue({
    user: {
      name: 'John Doe',
      email: 'john@example.com',
    },
    logout,
  })

  render(<UserProfile />)

  fireEvent.click(screen.getByRole('button', { name: 'JD' }))

  expect(screen.getByText('View Profile')).toBeInTheDocument()

  fireEvent.mouseDown(screen.getByText('John Doe'))

  expect(screen.getByText('View Profile')).toBeInTheDocument()
})
})