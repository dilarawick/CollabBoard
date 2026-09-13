const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const User = require('../../../server/models/User')

const usersRepository = require('../../../server/repositories/usersRepository')

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri())
})

afterEach(async () => {
  await User.deleteMany({})
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('Users Repository', () => {

  describe('getAllUsers', () => {

    test('should return all users', async () => {

      await User.create([
        { email: 'a@test.com', name: 'A', passwordHash: 'hash1' },
        { email: 'b@test.com', name: 'B', passwordHash: 'hash2' }
      ])

      const users = await usersRepository.getAllUsers()

      expect(users).toHaveLength(2)

    })

  })

  describe('getUserById', () => {

    test('should return a user by id', async () => {

      const created = await User.create({
        email: 'test@example.com', name: 'Test User', passwordHash: 'hash'
      })

      const user = await usersRepository.getUserById(created._id.toString())

      expect(user.email).toBe('test@example.com')

    })

    test('should return null for a non-existent id', async () => {

      const fakeId = new mongoose.Types.ObjectId()

      const user = await usersRepository.getUserById(fakeId.toString())

      expect(user).toBeNull()

    })

  })

  describe('getUserByEmail', () => {

    test('should return a user by email', async () => {

      await User.create({
        email: 'find-me@example.com', name: 'Find Me', passwordHash: 'hash'
      })

      const user = await usersRepository.getUserByEmail('find-me@example.com')

      expect(user.name).toBe('Find Me')

    })

  })

  describe('createUser', () => {

    test('should create and persist a new user', async () => {

      const newUser = await usersRepository.createUser({
        email: 'new@example.com', name: 'New User', passwordHash: 'hash'
      })

      expect(newUser.email).toBe('new@example.com')
      expect(newUser.passwordHash).toBeUndefined()

      const found = await User.findOne({ email: 'new@example.com' })
      expect(found).not.toBeNull()

    })

  })

})