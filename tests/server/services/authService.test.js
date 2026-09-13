const bcrypt = require('bcrypt')

const usersRepository = require('../../../server/repositories/usersRepository')

const authService = require('../../../server/services/authService')

jest.mock('bcrypt')
jest.mock('../../../server/repositories/usersRepository')

describe('Auth Service', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('listUsers', () => {

    test('should return all users', async () => {

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

      usersRepository.getAllUsers.mockResolvedValue(users)

      const result = await authService.listUsers()

      expect(usersRepository.getAllUsers)
        .toHaveBeenCalled()

      expect(result).toEqual(users)

    })

  })

  describe('findUserByEmail', () => {

    test('should find a user by email', async () => {

      const user = {
        _id: '123',
        email: 'test@example.com',
        name: 'Test User'
      }

      usersRepository.getUserByEmail
        .mockResolvedValue(user)

      const result = await authService.findUserByEmail(
        'test@example.com'
      )

      expect(usersRepository.getUserByEmail)
        .toHaveBeenCalledWith('test@example.com')

      expect(result).toEqual(user)

    })

  })

  describe('register', () => {

    test('should register a new user successfully', async () => {

      const userData = {
        email: 'test@example.com',
        password: 'Test@12345',
        name: 'Test User'
      }

      const createdUser = {
        _id: '123',
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'hashed-password'
      }

      usersRepository.getUserByEmail
        .mockResolvedValue(null)

      bcrypt.hashSync
        .mockReturnValue('hashed-password')

      usersRepository.createUser
        .mockResolvedValue(createdUser)

      const result = await authService.register(userData)

      expect(usersRepository.getUserByEmail)
        .toHaveBeenCalledWith('test@example.com')

      expect(bcrypt.hashSync)
        .toHaveBeenCalledWith('Test@12345', 10)

      expect(usersRepository.createUser)
        .toHaveBeenCalledWith({
          email: 'test@example.com',
          passwordHash: 'hashed-password',
          name: 'Test User'
        })

      expect(result).toEqual(createdUser)

    })

    test('should reject duplicate email', async () => {

      const existingUser = {
        _id: '123',
        email: 'test@example.com',
        name: 'Existing User'
      }

      const userData = {
        email: 'test@example.com',
        password: 'Test@12345',
        name: 'Test User'
      }

      usersRepository.getUserByEmail
        .mockResolvedValue(existingUser)

      await expect(
        authService.register(userData)
      ).rejects.toThrow('Email already registered')

      expect(usersRepository.createUser)
        .not.toHaveBeenCalled()

      expect(bcrypt.hashSync)
        .not.toHaveBeenCalled()

    })

  })

  describe('authenticate', () => {

    test('should authenticate a user successfully', async () => {

      const user = {
        _id: '123',
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'hashed-password'
      }

      usersRepository.getUserByEmail
        .mockResolvedValue(user)

      bcrypt.compareSync
        .mockReturnValue(true)

      const result = await authService.authenticate(
        'test@example.com',
        'Test@12345'
      )

      expect(usersRepository.getUserByEmail)
        .toHaveBeenCalledWith('test@example.com')

      expect(bcrypt.compareSync)
        .toHaveBeenCalledWith(
          'Test@12345',
          'hashed-password'
        )

      expect(result).toEqual({
        _id: '123',
        email: 'test@example.com',
        name: 'Test User'
      })

    })

    test('should reject unknown email', async () => {

      usersRepository.getUserByEmail
        .mockResolvedValue(null)

      await expect(
        authService.authenticate(
          'unknown@example.com',
          'Test@12345'
        )
      ).rejects.toThrow('Invalid email or password')

      expect(bcrypt.compareSync)
        .not.toHaveBeenCalled()

    })

    test('should reject incorrect password', async () => {

      const user = {
        _id: '123',
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'hashed-password'
      }

      usersRepository.getUserByEmail
        .mockResolvedValue(user)

      bcrypt.compareSync
        .mockReturnValue(false)

      await expect(
        authService.authenticate(
          'test@example.com',
          'WrongPassword'
        )
      ).rejects.toThrow('Invalid email or password')

    })

  })

})