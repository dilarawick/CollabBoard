const express = require('express')
const request = require('supertest')

const activitiesController = require('../../../server/controllers/activitiesController')

jest.mock('../../../server/controllers/activitiesController')

const activitiesRouter = require('../../../server/routes/activities')

describe('activities routes', () => {
  let app

  beforeEach(() => {
    jest.clearAllMocks()

    app = express()
    app.use(express.json())
    app.use('/api/activities', activitiesRouter)
  })

  test('GET /api/activities calls getActivities', async () => {
    activitiesController.getActivities.mockImplementation((req, res) => {
      res.status(200).json([{ action: 'Task created' }])
    })

    const response = await request(app)
      .get('/api/activities')

    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      { action: 'Task created' },
    ])

    expect(activitiesController.getActivities).toHaveBeenCalled()
  })

  test('GET /api/activities/:id calls getActivityById', async () => {
    activitiesController.getActivityById.mockImplementation((req, res) => {
      res.status(200).json({
        _id: req.params.id,
        action: 'Task created',
      })
    })

    const response = await request(app)
      .get('/api/activities/activity123')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      _id: 'activity123',
      action: 'Task created',
    })

    expect(activitiesController.getActivityById).toHaveBeenCalled()
  })

  test('POST /api/activities calls createActivity', async () => {
    activitiesController.createActivity.mockImplementation((req, res) => {
      res.status(201).json({
        ...req.body,
        _id: 'activity123',
      })
    })

    const activityData = {
      boardId: 'board123',
      taskId: 'task123',
      userId: 'user123',
      action: 'Task created',
    }

    const response = await request(app)
      .post('/api/activities')
      .send(activityData)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      ...activityData,
      _id: 'activity123',
    })

    expect(activitiesController.createActivity).toHaveBeenCalled()
  })
})