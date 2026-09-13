const request = require('supertest')
const express = require('express')

const usersService = require('../../../server/services/usersService')
const usersRouter = require('../../../server/routes/users')

jest.mock('../../../server/services/usersService')

const app = express()
app.use(express.json())
app.use('/api/users', usersRouter)

describe('Users Routes', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('GET /api/users should return all users', async () => {

    usersService.fetchAllUsers.mockResolvedValue([
      { _id: '1', email: 'a@test.com', name: 'A' }
    ])

    const res = await request(app).get('/api/users')

    expect(res.status).toBe(200)
    expect(res.body).toEqual([{ _id: '1', email: 'a@test.com', name: 'A' }])

  })

  test('GET /api/users/:id should return a single user', async () => {

    usersService.fetchUserById.mockResolvedValue({ _id: '123', email: 'test@example.com', name: 'Test' })

    const res = await request(app).get('/api/users/123')

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ _id: '123', email: 'test@example.com', name: 'Test' })

  })

  test('GET /api/users/:id should return 404 when not found', async () => {

    usersService.fetchUserById.mockResolvedValue(null)

    const res = await request(app).get('/api/users/doesnotexist')

    expect(res.status).toBe(404)

  })

})