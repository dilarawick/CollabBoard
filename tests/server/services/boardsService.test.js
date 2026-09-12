jest.mock('../../../server/repositories/boardsRepository')

const boardsRepository = require('../../../server/repositories/boardsRepository')
const boardsService = require('../../../server/services/boardsService')

describe('boardsService', () => {
  describe('listBoards', () => {
    test('delegates to boardsRepository.getAllBoards', async () => {
      const boards = [{ _id: '1' }]
      boardsRepository.getAllBoards.mockResolvedValue(boards)

      const result = await boardsService.listBoards()

      expect(boardsRepository.getAllBoards).toHaveBeenCalledTimes(1)
      expect(result).toBe(boards)
    })
  })

  describe('getBoard', () => {
    test('delegates to boardsRepository.getBoardById', async () => {
      const board = { _id: '1' }
      boardsRepository.getBoardById.mockResolvedValue(board)

      const result = await boardsService.getBoard('1')

      expect(boardsRepository.getBoardById).toHaveBeenCalledWith('1')
      expect(result).toBe(board)
    })
  })

  describe('listBoardsForUser', () => {
    test('delegates to boardsRepository.getBoardsByMemberId', async () => {
      const boards = [{ _id: '1' }]
      boardsRepository.getBoardsByMemberId.mockResolvedValue(boards)

      const result = await boardsService.listBoardsForUser('user-1')

      expect(boardsRepository.getBoardsByMemberId).toHaveBeenCalledWith('user-1')
      expect(result).toBe(boards)
    })
  })

  describe('addBoard', () => {
    test('throws when name is missing', async () => {
      await expect(boardsService.addBoard({ ownerId: 'u1' })).rejects.toThrow('Missing required fields')
      expect(boardsRepository.createBoard).not.toHaveBeenCalled()
    })

    test('throws when ownerId is missing', async () => {
      await expect(boardsService.addBoard({ name: 'Board' })).rejects.toThrow('Missing required fields')
      expect(boardsRepository.createBoard).not.toHaveBeenCalled()
    })

    test('creates the board when required fields are present', async () => {
      const created = { _id: '1', name: 'Board', ownerId: 'u1' }
      boardsRepository.createBoard.mockResolvedValue(created)

      const result = await boardsService.addBoard({ name: 'Board', ownerId: 'u1' })

      expect(boardsRepository.createBoard).toHaveBeenCalledWith({ name: 'Board', ownerId: 'u1' })
      expect(result).toBe(created)
    })
  })

  describe('modifyBoard', () => {
    test('throws when the board does not exist', async () => {
      boardsRepository.getBoardById.mockResolvedValue(null)

      await expect(boardsService.modifyBoard('missing', { name: 'X' })).rejects.toThrow('Board not found')
      expect(boardsRepository.updateBoard).not.toHaveBeenCalled()
    })

    test('updates the board when it exists', async () => {
      boardsRepository.getBoardById.mockResolvedValue({ _id: '1' })
      boardsRepository.updateBoard.mockResolvedValue({ _id: '1', name: 'Renamed' })

      const result = await boardsService.modifyBoard('1', { name: 'Renamed' })

      expect(boardsRepository.updateBoard).toHaveBeenCalledWith('1', { name: 'Renamed' })
      expect(result).toEqual({ _id: '1', name: 'Renamed' })
    })
  })

  describe('removeBoard', () => {
    test('throws when the board does not exist', async () => {
      boardsRepository.getBoardById.mockResolvedValue(null)

      await expect(boardsService.removeBoard('missing')).rejects.toThrow('Board not found')
      expect(boardsRepository.deleteBoard).not.toHaveBeenCalled()
    })

    test('deletes the board when it exists', async () => {
      boardsRepository.getBoardById.mockResolvedValue({ _id: '1' })
      boardsRepository.deleteBoard.mockResolvedValue(true)

      const result = await boardsService.removeBoard('1')

      expect(boardsRepository.deleteBoard).toHaveBeenCalledWith('1')
      expect(result).toBe(true)
    })
  })

  describe('addBoardMember', () => {
    const existingBoard = {
      _id: 'board-1',
      members: [{ userId: 'u1', role: 'owner' }]
    }

    test('throws when the board does not exist', async () => {
      boardsRepository.getBoardById.mockResolvedValue(null)

      await expect(
        boardsService.addBoardMember('missing', { userId: 'u2', role: 'editor' })
      ).rejects.toThrow('Board not found')
    })

    test('throws when userId is missing', async () => {
      boardsRepository.getBoardById.mockResolvedValue(existingBoard)

      await expect(
        boardsService.addBoardMember('board-1', { role: 'editor' })
      ).rejects.toThrow('Missing required fields')
    })

    test('throws when role is missing', async () => {
      boardsRepository.getBoardById.mockResolvedValue(existingBoard)

      await expect(
        boardsService.addBoardMember('board-1', { userId: 'u2' })
      ).rejects.toThrow('Missing required fields')
    })

    test('throws when role is invalid', async () => {
      boardsRepository.getBoardById.mockResolvedValue(existingBoard)

      await expect(
        boardsService.addBoardMember('board-1', { userId: 'u2', role: 'admin' })
      ).rejects.toThrow('Invalid role')
    })

    test('throws when the user is already a member', async () => {
      boardsRepository.getBoardById.mockResolvedValue(existingBoard)

      await expect(
        boardsService.addBoardMember('board-1', { userId: 'u1', role: 'editor' })
      ).rejects.toThrow('User is already a member of this board')
    })

    test('adds the member when valid and not already present', async () => {
      boardsRepository.getBoardById.mockResolvedValue(existingBoard)
      boardsRepository.addMember.mockResolvedValue({
        ...existingBoard,
        members: [...existingBoard.members, { userId: 'u2', role: 'editor' }]
      })

      const result = await boardsService.addBoardMember('board-1', { userId: 'u2', role: 'editor' })

      expect(boardsRepository.addMember).toHaveBeenCalledWith('board-1', { userId: 'u2', role: 'editor' })
      expect(result.members).toHaveLength(2)
    })
  })

  describe('removeBoardMember', () => {
    test('throws when the board does not exist', async () => {
      boardsRepository.getBoardById.mockResolvedValue(null)

      await expect(boardsService.removeBoardMember('missing', 'u1')).rejects.toThrow('Board not found')
      expect(boardsRepository.removeMember).not.toHaveBeenCalled()
    })

    test('removes the member when the board exists', async () => {
      boardsRepository.getBoardById.mockResolvedValue({ _id: 'board-1', members: [] })
      boardsRepository.removeMember.mockResolvedValue({ _id: 'board-1', members: [] })

      const result = await boardsService.removeBoardMember('board-1', 'u1')

      expect(boardsRepository.removeMember).toHaveBeenCalledWith('board-1', 'u1')
      expect(result).toEqual({ _id: 'board-1', members: [] })
    })
  })
})
