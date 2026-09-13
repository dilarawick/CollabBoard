const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const User = require('../../../server/models/User')
const usersRepository = require('../../../server/repositories/usersRepository')

let mongoServer

describe('Users Repository - MongoDB', () => {

  beforeAll(async () => {

    mongoServer = await MongoMemoryServer.create()

    const mongoUri = mongoServer.getUri()

    await mongoose.connect(mongoUri)

  })

  afterEach(async () => {

    await User.deleteMany({})

  })

  afterAll(async () => {

    await mongoose.disconnect()

    await mongoServer.stop()

  })

  describe('getAllUsers', () => {

    test('should return all users without passwordHash', async () => {

      await User.create([
        {
          email: 'user1@example.com',
          passwordHash: 'hash1',
          name: 'User One'
        },
        {
          email: 'user2@example.com',
          passwordHash: 'hash2',
          name: 'User Two'
        }
      ])

      const result = await usersRepository.getAllUsers()

      expect(result).toHaveLength(2)

      result.forEach((user) => {
        expect(user).not.toHaveProperty('passwordHash')
        expect(user).toHaveProperty('email')
        expect(user).toHaveProperty('name')
      })

    })

  })

  describe('getUserByEmail', () => {

    test('should return a user by email', async () => {

      await User.create({
        email: 'test@example.com',
        passwordHash: 'hashed-password',
        name: 'Test User'
      })

      const result = await usersRepository.getUserByEmail(
        'test@example.com'
      )

      expect(result).not.toBeNull()
      expect(result.email).toBe('test@example.com')
      expect(result.name).toBe('Test User')
      expect(result.passwordHash).toBe('hashed-password')

    })

    test('should return null when user is not found', async () => {

      const result = await usersRepository.getUserByEmail(
        'unknown@example.com'
      )

      expect(result).toBeNull()

    })

  })

  describe('getUserById', () => {

    test('should return a user by ID', async () => {

      const createdUser = await User.create({
        email: 'iduser@example.com',
        passwordHash: 'hashed-password',
        name: 'ID User'
      })

      const result = await usersRepository.getUserById(
        createdUser._id.toString()
      )

      expect(result).not.toBeNull()
      expect(result.email).toBe('iduser@example.com')
      expect(result.name).toBe('ID User')

    })

    test('should return null when ID is not found', async () => {

      const result = await usersRepository.getUserById(
        new mongoose.Types.ObjectId()
      )

      expect(result).toBeNull()

    })

  })

  describe('createUser', () => {

    test('should create a new user successfully', async () => {

      const userData = {
        email: 'newuser@example.com',
        passwordHash: 'hashed-password',
        name: 'New User'
      }

      const result = await usersRepository.createUser(userData)

      expect(result).toHaveProperty('_id')
      expect(result.email).toBe('newuser@example.com')
      expect(result.name).toBe('New User')
      expect(result).not.toHaveProperty('passwordHash')

      const savedUser = await User.findOne({
        email: 'newuser@example.com'
      })

      expect(savedUser).not.toBeNull()
      expect(savedUser.passwordHash).toBe('hashed-password')

    })

  })

})