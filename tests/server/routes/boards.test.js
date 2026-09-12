const express = require('express')
const request = require('supertest')
const boardsRouter = require('../../../server/routes/boards')
const { boards: seedBoards } = require('../../../server/mockdata')

// Self-contained test app: mounts only the boards router so this test file
// doesn't depend on server/app.js or server/server.js (owned by another module).
const app = express()
app.use(express.json())
app.use('/api/boards', boardsRouter)

describe('GET /api/boards', () => {
  test('returns 200 and all seeded boards', async () => {
    const res = await request(app).get('/api/boards')

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body).toHaveLength(seedBoards.length)
  })
})

describe('GET /api/boards/:id', () => {
  test('returns 200 and the matching board for a known id', async () => {
    const target = seedBoards[0]
    const res = await request(app).get(`/api/boards/${target._id}`)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(target.name)
  })

  test('returns 404 for an unknown id', async () => {
    const res = await request(app).get('/api/boards/does-not-exist')

    expect(res.status).toBe(404)
    expect(res.body).toEqual({ error: 'Board not found' })
  })
})
