import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('../../../client/src/components/board/Board/Board', () => {
  return function MockBoard() {
    return <div>Mock Board</div>
  }
})

import BoardPage from '../../../client/src/pages/BoardPage/BoardPage'

describe('BoardPage', () => {
  test('should render the Board component', () => {
    render(<BoardPage />)

    expect(screen.getByText('Mock Board')).toBeInTheDocument()
  })
})