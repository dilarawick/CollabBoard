jest.mock('../../../server/services/boardsService')

const boardsService = require('../../../server/services/boardsService')
const boardsController = require('../../../server/controllers/boardsController')

function mockRes() {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('boardsController', () => {
  describe('getAllBoards', () => {
    test('responds 200 with the list of boards', async () => {
      const boards = [{ _id: '1' }, { _id: '2' }]
      boardsService.listBoards.mockResolvedValue(boards)
      const req = {}
      const res = mockRes()

      await boardsController.getAllBoards(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(boards)
    })

    test('responds 500 when the service throws', async () => {
      boardsService.listBoards.mockRejectedValue(new Error('db down'))
      const req = {}
      const res = mockRes()

      await boardsController.getAllBoards(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch boards' })
    })
  })

  describe('getBoardById', () => {
    test('responds 200 with the board when found', async () => {
      const board = { _id: '1', name: 'Board' }
      boardsService.getBoard.mockResolvedValue(board)
      const req = { params: { id: '1' } }
      const res = mockRes()

      await boardsController.getBoardById(req, res)

      expect(boardsService.getBoard).toHaveBeenCalledWith('1')
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(board)
    })

    test('responds 404 when the board is not found', async () => {
      boardsService.getBoard.mockResolvedValue(null)
      const req = { params: { id: 'missing' } }
      const res = mockRes()

      await boardsController.getBoardById(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ error: 'Board not found' })
    })

    test('responds 500 when the service throws', async () => {
      boardsService.getBoard.mockRejectedValue(new Error('db down'))
      const req = { params: { id: '1' } }
      const res = mockRes()

      await boardsController.getBoardById(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch board' })
    })
  })
})
