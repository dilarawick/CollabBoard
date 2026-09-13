const activitiesService = require('../../../server/services/activitiesService')
const activitiesRepository = require('../../../server/repositories/activitiesRepository')

jest.mock('../../../server/repositories/activitiesRepository')

describe('activitiesService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('listActivities', () => {
    test('gets all activities when no filter is provided', async () => {
      const activities = [{ action: 'Task created' }]

      activitiesRepository.getAllActivities.mockResolvedValue(activities)

      const result = await activitiesService.listActivities()

      expect(activitiesRepository.getAllActivities).toHaveBeenCalled()
      expect(result).toEqual(activities)
    })

    test('gets activities by boardId', async () => {
      const activities = [{ action: 'Task created' }]

      activitiesRepository.getActivitiesByBoardId.mockResolvedValue(activities)

      const result = await activitiesService.listActivities({
        boardId: 'board123',
      })

      expect(
        activitiesRepository.getActivitiesByBoardId
      ).toHaveBeenCalledWith('board123')

      expect(result).toEqual(activities)
    })

    test('gets activities by taskId', async () => {
      const activities = [{ action: 'Task updated' }]

      activitiesRepository.getActivitiesByTaskId.mockResolvedValue(activities)

      const result = await activitiesService.listActivities({
        taskId: 'task123',
      })

      expect(
        activitiesRepository.getActivitiesByTaskId
      ).toHaveBeenCalledWith('task123')

      expect(result).toEqual(activities)
    })

    test('gets activities by userId', async () => {
      const activities = [{ action: 'Comment added' }]

      activitiesRepository.getActivitiesByUserId.mockResolvedValue(activities)

      const result = await activitiesService.listActivities({
        userId: 'user123',
      })

      expect(
        activitiesRepository.getActivitiesByUserId
      ).toHaveBeenCalledWith('user123')

      expect(result).toEqual(activities)
    })
  })

  describe('getActivity', () => {
    test('returns activity when it exists', async () => {
      const activity = {
        _id: 'activity123',
        action: 'Task created',
      }

      activitiesRepository.getActivityById.mockResolvedValue(activity)

      const result = await activitiesService.getActivity('activity123')

      expect(
        activitiesRepository.getActivityById
      ).toHaveBeenCalledWith('activity123')

      expect(result).toEqual(activity)
    })

    test('throws error when activity does not exist', async () => {
      activitiesRepository.getActivityById.mockResolvedValue(null)

      await expect(
        activitiesService.getActivity('invalid-id')
      ).rejects.toThrow('Activity not found')
    })
  })

  describe('addActivity', () => {
    test('creates activity when required fields are provided', async () => {
      const activityData = {
        boardId: 'board123',
        taskId: 'task123',
        userId: 'user123',
        action: 'Task created',
      }

      activitiesRepository.createActivity.mockResolvedValue(activityData)

      const result = await activitiesService.addActivity(activityData)

      expect(
        activitiesRepository.createActivity
      ).toHaveBeenCalledWith(activityData)

      expect(result).toEqual(activityData)
    })

    test('throws error when required fields are missing', async () => {
      const activityData = {
        boardId: 'board123',
        taskId: 'task123',
      }

      await expect(
        activitiesService.addActivity(activityData)
      ).rejects.toThrow('Missing required fields')

      expect(
        activitiesRepository.createActivity
      ).not.toHaveBeenCalled()
    })
  })

  describe('removeActivity', () => {
    test('deletes activity when it exists', async () => {
      const activity = {
        _id: 'activity123',
        action: 'Task created',
      }

      activitiesRepository.getActivityById.mockResolvedValue(activity)
      activitiesRepository.deleteActivity.mockResolvedValue(true)

      const result = await activitiesService.removeActivity('activity123')

      expect(
        activitiesRepository.getActivityById
      ).toHaveBeenCalledWith('activity123')

      expect(
        activitiesRepository.deleteActivity
      ).toHaveBeenCalledWith('activity123')

      expect(result).toBe(true)
    })

    test('throws error when activity does not exist', async () => {
      activitiesRepository.getActivityById.mockResolvedValue(null)

      await expect(
        activitiesService.removeActivity('invalid-id')
      ).rejects.toThrow('Activity not found')

      expect(
        activitiesRepository.deleteActivity
      ).not.toHaveBeenCalled()
    })
  })
})