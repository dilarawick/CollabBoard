import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'

jest.mock('../../../client/src/context/UserContext', () => ({
  useUser: jest.fn(),
}))

jest.mock('../../../client/src/services/api', () => ({
  login: jest.fn(),
}))

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom')

  return {
    ...actual,
    useNavigate: jest.fn(),
  }
})

import LoginPage from '../../../client/src/pages/LoginPage/LoginPage'
import { useUser } from '../../../client/src/context/UserContext'
import * as api from '../../../client/src/services/api'

describe('LoginPage', () => {
  const login = jest.fn()
  const navigate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    useUser.mockReturnValue({
      login,
    })

    useNavigate.mockReturnValue(navigate)
  })

  const renderLoginPage = () => {
    return render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )
  }

  test('should render the login page', () => {
    renderLoginPage()

    expect(
      screen.getByRole('heading', { name: 'Welcome back' })
    ).toBeInTheDocument()

    expect(screen.getByText('CollabBoard')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Log in' })
    ).toBeInTheDocument()
  })

  test('should link to the signup page', () => {
    renderLoginPage()

    expect(
      screen.getByRole('link', { name: 'Create account' })
    ).toHaveAttribute('href', '/signup')
  })

  test('should show validation error when fields are empty', () => {
    renderLoginPage()

    fireEvent.click(
      screen.getByRole('button', { name: 'Log in' })
    )

    expect(
      screen.getByText('Please fill in all fields.')
    ).toBeInTheDocument()

    expect(api.login).not.toHaveBeenCalled()
  })

  test('should submit email and password successfully', async () => {
    const user = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
    }

    api.login.mockResolvedValue(user)

    renderLoginPage()

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Log in' })
    )

    await waitFor(() => {
      expect(api.login).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      )
    })

    expect(login).toHaveBeenCalledWith(user)
    expect(navigate).toHaveBeenCalledWith('/app')
  })

  test('should display an error when login fails', async () => {
    api.login.mockRejectedValue(
      new Error('Invalid email or password')
    )

    renderLoginPage()

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrong-password' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Log in' })
    )

    expect(
      await screen.findByText('Invalid email or password')
    ).toBeInTheDocument()

    expect(login).not.toHaveBeenCalled()
    expect(navigate).not.toHaveBeenCalled()
  })
})