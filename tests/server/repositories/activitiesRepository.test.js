const activitiesRepository = require('../../../server/repositories/activitiesRepository')
const Activity = require('../../../server/models/Activity')

jest.mock('../../../server/models/Activity')

describe('activitiesRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllActivities', () => {
    test('returns all activities sorted by newest first', async () => {
      const activities = [
        { action: 'Task updated' },
        { action: 'Task created' },
      ]

      const sortMock = jest.fn().mockResolvedValue(activities)

      Activity.find.mockReturnValue({
        sort: sortMock,
      })

      const result = await activitiesRepository.getAllActivities()

      expect(Activity.find).toHaveBeenCalledWith()
      expect(sortMock).toHaveBeenCalledWith({ at: -1 })
      expect(result).toEqual(activities)
    })
  })

  describe('getActivityById', () => {
    test('returns activity by id', async () => {
      const activity = {
        _id: 'activity123',
        action: 'Task created',
      }

      Activity.findById.mockResolvedValue(activity)

      const result = await activitiesRepository.getActivityById('activity123')

      expect(Activity.findById).toHaveBeenCalledWith('activity123')
      expect(result).toEqual(activity)
    })
  })

  describe('getActivitiesByBoardId', () => {
    test('returns activities for a board sorted by newest first', async () => {
      const activities = [
        { boardId: 'board123', action: 'Task updated' },
      ]

      const sortMock = jest.fn().mockResolvedValue(activities)

      Activity.find.mockReturnValue({
        sort: sortMock,
      })

      const result =
        await activitiesRepository.getActivitiesByBoardId('board123')

      expect(Activity.find).toHaveBeenCalledWith({
        boardId: 'board123',
      })

      expect(sortMock).toHaveBeenCalledWith({ at: -1 })
      expect(result).toEqual(activities)
    })
  })

  describe('getActivitiesByTaskId', () => {
    test('returns activities for a task sorted by newest first', async () => {
      const activities = [
        { taskId: 'task123', action: 'Task updated' },
      ]

      const sortMock = jest.fn().mockResolvedValue(activities)

      Activity.find.mockReturnValue({
        sort: sortMock,
      })

      const result =
        await activitiesRepository.getActivitiesByTaskId('task123')

      expect(Activity.find).toHaveBeenCalledWith({
        taskId: 'task123',
      })

      expect(sortMock).toHaveBeenCalledWith({ at: -1 })
      expect(result).toEqual(activities)
    })
  })

  describe('getActivitiesByUserId', () => {
    test('returns activities for a user sorted by newest first', async () => {
      const activities = [
        { userId: 'user123', action: 'Task created' },
      ]

      const sortMock = jest.fn().mockResolvedValue(activities)

      Activity.find.mockReturnValue({
        sort: sortMock,
      })

      const result =
        await activitiesRepository.getActivitiesByUserId('user123')

      expect(Activity.find).toHaveBeenCalledWith({
        userId: 'user123',
      })

      expect(sortMock).toHaveBeenCalledWith({ at: -1 })
      expect(result).toEqual(activities)
    })
  })

  describe('createActivity', () => {
    test('creates and saves an activity', async () => {
      const activityData = {
        boardId: 'board123',
        taskId: 'task123',
        userId: 'user123',
        action: 'Task created',
      }

      const savedActivity = {
        _id: 'activity123',
        ...activityData,
      }

      const saveMock = jest.fn().mockResolvedValue(savedActivity)

      Activity.mockImplementation(() => ({
        save: saveMock,
      }))

      const result =
        await activitiesRepository.createActivity(activityData)

      expect(Activity).toHaveBeenCalledWith(activityData)
      expect(saveMock).toHaveBeenCalled()
      expect(result).toEqual(savedActivity)
    })
  })

  describe('deleteActivity', () => {
    test('returns true when an activity is deleted', async () => {
      const deletedActivity = {
        _id: 'activity123',
        action: 'Task created',
      }

      Activity.findByIdAndDelete.mockResolvedValue(deletedActivity)

      const result =
        await activitiesRepository.deleteActivity('activity123')

      expect(Activity.findByIdAndDelete).toHaveBeenCalledWith(
        'activity123'
      )

      expect(result).toBe(true)
    })

    test('returns false when activity does not exist', async () => {
      Activity.findByIdAndDelete.mockResolvedValue(null)

      const result =
        await activitiesRepository.deleteActivity('invalid-id')

      expect(Activity.findByIdAndDelete).toHaveBeenCalledWith(
        'invalid-id'
      )

      expect(result).toBe(false)
    })
  })
})