const usersService = require('../../../server/services/usersService')

const {
  getAllUsers,
  getUserById
} = require('../../../server/controllers/usersController')

jest.mock('../../../server/services/usersService')

describe('Users Controller', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // ==========================================
  // 1 & 2. GET ALL USERS
  // ==========================================

  describe('getAllUsers', () => {

    test('should get all users successfully', async () => {

      const req = {}

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      const users = [
        { _id: '1', email: 'user1@example.com', name: 'User One' },
        { _id: '2', email: 'user2@example.com', name: 'User Two' }
      ]

      usersService.fetchAllUsers.mockResolvedValue(users)

      await getAllUsers(req, res)

      expect(usersService.fetchAllUsers)
        .toHaveBeenCalled()

      expect(res.status)
        .toHaveBeenCalledWith(200)

      expect(res.json)
        .toHaveBeenCalledWith(users)

    })

    test('should return 500 when fetching users fails', async () => {

      const req = {}

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      usersService.fetchAllUsers.mockRejectedValue(
        new Error('Database error')
      )

      await getAllUsers(req, res)

      expect(res.status)
        .toHaveBeenCalledWith(500)

      expect(res.json)
        .toHaveBeenCalledWith({
          error: 'Failed to fetch users'
        })

    })

  })

  // ==========================================
  // 3, 4 & 5. GET USER BY ID
  // ==========================================

  describe('getUserById', () => {

    test('should get a user by id successfully', async () => {

      const req = { params: { id: '123' } }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      const user = { _id: '123', email: 'test@example.com', name: 'Test User' }

      usersService.fetchUserById.mockResolvedValue(user)

      await getUserById(req, res)

      expect(usersService.fetchUserById)
        .toHaveBeenCalledWith('123')

      expect(res.status)
        .toHaveBeenCalledWith(200)

      expect(res.json)
        .toHaveBeenCalledWith(user)

    })

    test('should return 404 when user not found', async () => {

      const req = { params: { id: 'doesnotexist' } }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      usersService.fetchUserById.mockResolvedValue(null)

      await getUserById(req, res)

      expect(res.status)
        .toHaveBeenCalledWith(404)

      expect(res.json)
        .toHaveBeenCalledWith({
          error: 'User not found'
        })

    })

    test('should return 500 when fetching user fails', async () => {

      const req = { params: { id: '123' } }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      usersService.fetchUserById.mockRejectedValue(
        new Error('Database error')
      )

      await getUserById(req, res)

      expect(res.status)
        .toHaveBeenCalledWith(500)

      expect(res.json)
        .toHaveBeenCalledWith({
          error: 'Failed to fetch user'
        })

    })

  })

})