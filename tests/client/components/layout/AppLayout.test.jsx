import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

jest.mock('../../../../client/src/components/ui/UserProfile/UserProfile', () => {
  return function MockUserProfile() {
    return <div>User Profile</div>
  }
})

jest.mock('../../../../client/src/components/ui/ThemeToggle/ThemeToggle', () => {
  return function MockThemeToggle() {
    return <div>Theme Toggle</div>
  }
})

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom')

  return {
    ...actual,
    Outlet: () => <div>Page Content</div>,
  }
})

import AppLayout from '../../../../client/src/components/layout/AppLayout/AppLayout'

describe('AppLayout', () => {
  const renderAppLayout = () => {
    return render(
      <MemoryRouter initialEntries={['/app']}>
        <AppLayout />
      </MemoryRouter>
    )
  }

  test('should render the CollabBoard brand', () => {
    renderAppLayout()

    expect(
      screen.getByRole('heading', { name: 'CollabBoard' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: /CollabBoard/i })
    ).toHaveAttribute('href', '/app')
  })

  test('should render the Board navigation link', () => {
    renderAppLayout()

    expect(
      screen.getByRole('link', { name: 'Board' })
    ).toHaveAttribute('href', '/app')
  })

  test('should render the UserProfile component', () => {
    renderAppLayout()

    expect(
      screen.getByText('User Profile')
    ).toBeInTheDocument()
  })

  test('should render the ThemeToggle component', () => {
    renderAppLayout()

    expect(
      screen.getByText('Theme Toggle')
    ).toBeInTheDocument()
  })

  test('should render nested page content through Outlet', () => {
    renderAppLayout()

    expect(
      screen.getByText('Page Content')
    ).toBeInTheDocument()
  })
})