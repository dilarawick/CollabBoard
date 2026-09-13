const activitiesController = require('../../../server/controllers/activitiesController')
const activitiesService = require('../../../server/services/activitiesService')

jest.mock('../../../server/services/activitiesService')

describe('activitiesController', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getActivities', () => {
    test('returns activities with 200 status', async () => {
      const activities = [
        { action: 'Task created' },
        { action: 'Task updated' },
      ]

      activitiesService.listActivities.mockResolvedValue(activities)

      const req = {
        query: {
          boardId: 'board123',
          taskId: 'task123',
          userId: 'user123',
        },
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      await activitiesController.getActivities(req, res)

      expect(activitiesService.listActivities).toHaveBeenCalledWith({
        boardId: 'board123',
        taskId: 'task123',
        userId: 'user123',
      })

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(activities)
    })

    test('returns 400 when service throws an error', async () => {
      activitiesService.listActivities.mockRejectedValue(
        new Error('Failed to get activities')
      )

      const req = {
        query: {},
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      await activitiesController.getActivities(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to get activities',
      })
    })
  })

  describe('getActivityById', () => {
    test('returns activity with 200 status', async () => {
      const activity = {
        _id: 'activity123',
        action: 'Task created',
      }

      activitiesService.getActivity.mockResolvedValue(activity)

      const req = {
        params: {
          id: 'activity123',
        },
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      await activitiesController.getActivityById(req, res)

      expect(activitiesService.getActivity).toHaveBeenCalledWith(
        'activity123'
      )

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(activity)
    })

    test('returns 404 when service throws an error', async () => {
      activitiesService.getActivity.mockRejectedValue(
        new Error('Activity not found')
      )

      const req = {
        params: {
          id: 'invalid-id',
        },
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      await activitiesController.getActivityById(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Activity not found',
      })
    })
  })

  describe('createActivity', () => {
    test('creates activity and returns 201 status', async () => {
      const activityData = {
        boardId: 'board123',
        taskId: 'task123',
        userId: 'user123',
        action: 'Task created',
      }

      const activity = {
        _id: 'activity123',
        ...activityData,
      }

      activitiesService.addActivity.mockResolvedValue(activity)

      const req = {
        body: activityData,
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      await activitiesController.createActivity(req, res)

      expect(activitiesService.addActivity).toHaveBeenCalledWith(activityData)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(activity)
    })

    test('returns 400 when service throws an error', async () => {
      activitiesService.addActivity.mockRejectedValue(
        new Error('Missing required fields')
      )

      const req = {
        body: {},
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      await activitiesController.createActivity(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Missing required fields',
      })
    })
  })
})