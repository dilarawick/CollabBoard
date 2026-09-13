const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const User = require('../../../server/models/User')

let mongoServer

describe('User Model', () => {
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

  test('should create a valid user', async () => {
    const user = new User({
      email: 'test@example.com',
      passwordHash: 'hashed-password',
      name: 'Test User'
    })

    const savedUser = await user.save()

    expect(savedUser._id).toBeDefined()
    expect(savedUser.email).toBe('test@example.com')
    expect(savedUser.passwordHash).toBe('hashed-password')
    expect(savedUser.name).toBe('Test User')
    expect(savedUser.createdAt).toBeDefined()
  })

  test('should require email', async () => {
    const user = new User({
      passwordHash: 'hashed-password',
      name: 'Test User'
    })

    await expect(user.validate())
      .rejects.toThrow(/email.*required/i)
  })

  test('should require passwordHash', async () => {
    const user = new User({
      email: 'test@example.com',
      name: 'Test User'
    })

    await expect(user.validate())
      .rejects.toThrow(/passwordHash.*required/i)
  })

  test('should require name', async () => {
    const user = new User({
      email: 'test@example.com',
      passwordHash: 'hashed-password'
    })

    await expect(user.validate())
      .rejects.toThrow(/name.*required/i)
  })

  test('should cast email to a string', () => {
    const user = new User({
      email: 12345,
      passwordHash: 'hashed-password',
      name: 'Test User'
    })

    expect(typeof user.email).toBe('string')
    expect(user.email).toBe('12345')
  })

  test('should cast passwordHash to a string', () => {
    const user = new User({
      email: 'test@example.com',
      passwordHash: 12345,
      name: 'Test User'
    })

    expect(typeof user.passwordHash).toBe('string')
    expect(user.passwordHash).toBe('12345')
  })

  test('should cast name to a string', () => {
    const user = new User({
      email: 'test@example.com',
      passwordHash: 'hashed-password',
      name: 12345
    })

    expect(typeof user.name).toBe('string')
    expect(user.name).toBe('12345')
  })

  test('should enforce unique email', async () => {
    await User.create({
      email: 'duplicate@example.com',
      passwordHash: 'hash1',
      name: 'User One'
    })

    await expect(
      User.create({
        email: 'duplicate@example.com',
        passwordHash: 'hash2',
        name: 'User Two'
      })
    ).rejects.toThrow()
  })
})