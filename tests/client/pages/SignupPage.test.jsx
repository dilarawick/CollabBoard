import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'

jest.mock('../../../client/src/context/UserContext', () => ({
  useUser: jest.fn(),
}))

jest.mock('../../../client/src/services/api', () => ({
  signup: jest.fn(),
}))

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom')

  return {
    ...actual,
    useNavigate: jest.fn(),
  }
})

import SignupPage from '../../../client/src/pages/SignupPage/SignupPage'
import { useUser } from '../../../client/src/context/UserContext'
import * as api from '../../../client/src/services/api'

describe('SignupPage', () => {
  const login = jest.fn()
  const navigate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    useUser.mockReturnValue({
      login,
    })

    useNavigate.mockReturnValue(navigate)
  })

  const renderSignupPage = () => {
    return render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    )
  }

  test('should render the signup page', () => {
    renderSignupPage()

    expect(
      screen.getByRole('heading', { name: 'Create your account' })
    ).toBeInTheDocument()

    expect(screen.getByLabelText('Full name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Create account' })
    ).toBeInTheDocument()
  })

  test('should link to the login page', () => {
    renderSignupPage()

    expect(
      screen.getByRole('link', { name: 'Log in' })
    ).toHaveAttribute('href', '/login')
  })

  test('should show validation error when fields are empty', () => {
    renderSignupPage()

    fireEvent.click(
      screen.getByRole('button', { name: 'Create account' })
    )

    expect(
      screen.getByText('Please fill in all fields.')
    ).toBeInTheDocument()

    expect(api.signup).not.toHaveBeenCalled()
  })

  test('should show error when passwords do not match', () => {
    renderSignupPage()

    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Test User' },
    })

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    })

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'different-password' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Create account' })
    )

    expect(
      screen.getByText('Passwords do not match.')
    ).toBeInTheDocument()

    expect(api.signup).not.toHaveBeenCalled()
  })

  test('should create account successfully', async () => {
    const user = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
    }

    api.signup.mockResolvedValue(user)

    renderSignupPage()

    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Test User' },
    })

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    })

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'password123' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Create account' })
    )

    await waitFor(() => {
      expect(api.signup).toHaveBeenCalledWith(
        'Test User',
        'test@example.com',
        'password123'
      )
    })

    expect(login).toHaveBeenCalledWith(user)
    expect(navigate).toHaveBeenCalledWith('/app')
  })

  test('should display an error when signup fails', async () => {
    api.signup.mockRejectedValue(
      new Error('Email already exists')
    )

    renderSignupPage()

    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Test User' },
    })

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    })

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'password123' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Create account' })
    )

    expect(
      await screen.findByText('Email already exists')
    ).toBeInTheDocument()

    expect(login).not.toHaveBeenCalled()
    expect(navigate).not.toHaveBeenCalled()
  })
})