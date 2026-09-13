import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

jest.mock('../../../../client/src/context/ThemeContext', () => ({
  useTheme: jest.fn(),
}))

import ThemeToggle from '../../../../client/src/components/ui/ThemeToggle/ThemeToggle'
import { useTheme } from '../../../../client/src/context/ThemeContext'

describe('ThemeToggle', () => {
  const toggleTheme = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render light mode state', () => {
    useTheme.mockReturnValue({
      theme: 'light',
      toggleTheme,
    })

    render(<ThemeToggle />)

    expect(
      screen.getByRole('button', { name: 'Switch to dark mode' })
    ).toBeInTheDocument()

    expect(
      screen.getByText('Light Mode')
    ).toBeInTheDocument()
  })

  test('should render dark mode state', () => {
    useTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme,
    })

    render(<ThemeToggle />)

    expect(
      screen.getByRole('button', { name: 'Switch to light mode' })
    ).toBeInTheDocument()

    expect(
      screen.getByText('Night Mode')
    ).toBeInTheDocument()
  })

  test('should call toggleTheme when clicked', () => {
    useTheme.mockReturnValue({
      theme: 'light',
      toggleTheme,
    })

    render(<ThemeToggle />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Switch to dark mode' })
    )

    expect(toggleTheme).toHaveBeenCalledTimes(1)
  })

  test('should set correct title in light mode', () => {
    useTheme.mockReturnValue({
      theme: 'light',
      toggleTheme,
    })

    render(<ThemeToggle />)

    expect(
      screen.getByRole('button', { name: 'Switch to dark mode' })
    ).toHaveAttribute('title', 'Switch to dark mode')
  })

  test('should set correct title in dark mode', () => {
    useTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme,
    })

    render(<ThemeToggle />)

    expect(
      screen.getByRole('button', { name: 'Switch to light mode' })
    ).toHaveAttribute('title', 'Switch to light mode')
  })
})