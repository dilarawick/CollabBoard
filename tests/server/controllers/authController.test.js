
const authService = require('../../../server/services/authService')

const {
  signup,
  login,
  getUsers
} = require('../../../server/controllers/authController')

jest.mock('../../../server/services/authService')

describe('Auth Controller', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // ==========================================
  // 1. SIGNUP SUCCESS
  // ==========================================

  describe('signup', () => {

    test('should register a user successfully', async () => {

      const req = {
        body: {
          email: 'test@example.com',
          password: 'Test@12345',
          name: 'Test User'
        }
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      authService.register.mockResolvedValue({
        _id: '123',
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'secret-hash'
      })

      await signup(req, res)

      expect(authService.register)
        .toHaveBeenCalledWith(req.body)

      expect(res.status)
        .toHaveBeenCalledWith(201)

      expect(res.json)
        .toHaveBeenCalledWith({
          _id: '123',
          email: 'test@example.com',
          name: 'Test User'
        })

    })


    // ==========================================
    // 2. SIGNUP SERVICE ERROR
    // ==========================================

    test('should return 400 when signup fails', async () => {

      const req = {
        body: {
          email: 'test@example.com',
          password: 'Test@12345',
          name: 'Test User'
        }
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      authService.register.mockRejectedValue(
        new Error('Email already registered')
      )

      await signup(req, res)

      expect(res.status)
        .toHaveBeenCalledWith(400)

      expect(res.json)
        .toHaveBeenCalledWith({
          message: 'Email already registered'
        })

    })

  })


  // ==========================================
  // 3 & 4. LOGIN
  // ==========================================

  describe('login', () => {

    test('should login successfully', async () => {

      const req = {
        body: {
          email: 'test@example.com',
          password: 'Test@12345'
        }
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      const user = {
        _id: '123',
        email: 'test@example.com',
        name: 'Test User'
      }

      authService.authenticate.mockResolvedValue(user)

      await login(req, res)

      expect(authService.authenticate)
        .toHaveBeenCalledWith(
          'test@example.com',
          'Test@12345'
        )

      expect(res.status)
        .toHaveBeenCalledWith(200)

      expect(res.json)
        .toHaveBeenCalledWith(user)

    })


    test('should return 401 when login fails', async () => {

      const req = {
        body: {
          email: 'test@example.com',
          password: 'WrongPassword'
        }
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      authService.authenticate.mockRejectedValue(
        new Error('Invalid email or password')
      )

      await login(req, res)

      expect(res.status)
        .toHaveBeenCalledWith(401)

      expect(res.json)
        .toHaveBeenCalledWith({
          message: 'Invalid email or password'
        })

    })

  })


  // ==========================================
  // 5 & 6. GET USERS
  // ==========================================

  describe('getUsers', () => {

    test('should get all users successfully', async () => {

      const req = {}

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      const users = [
        {
          _id: '1',
          email: 'user1@example.com',
          name: 'User One'
        },
        {
          _id: '2',
          email: 'user2@example.com',
          name: 'User Two'
        }
      ]

      authService.listUsers.mockResolvedValue(users)

      await getUsers(req, res)

      expect(authService.listUsers)
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

      authService.listUsers.mockRejectedValue(
        new Error('Database error')
      )

      await getUsers(req, res)

      expect(res.status)
        .toHaveBeenCalledWith(500)

      expect(res.json)
        .toHaveBeenCalledWith({
          error: 'Failed to fetch users'
        })

    })

  })

})