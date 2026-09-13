const mongoose = require('mongoose')
const Activity = require('../../../server/models/Activity')

describe('Activity model', () => {
  test('has the correct model name', () => {
    expect(Activity.modelName).toBe('Activity')
  })

  test('requires boardId, taskId, userId, and action', () => {
    const activity = new Activity({})

    const error = activity.validateSync()

    expect(error.errors.boardId).toBeDefined()
    expect(error.errors.taskId).toBeDefined()
    expect(error.errors.userId).toBeDefined()
    expect(error.errors.action).toBeDefined()
  })

  test('accepts a valid activity', () => {
    const activity = new Activity({
      boardId: new mongoose.Types.ObjectId(),
      taskId: new mongoose.Types.ObjectId(),
      userId: new mongoose.Types.ObjectId(),
      action: 'Task created',
    })

    const error = activity.validateSync()

    expect(error).toBeUndefined()
  })

  test('trims action text', () => {
    const activity = new Activity({
      boardId: new mongoose.Types.ObjectId(),
      taskId: new mongoose.Types.ObjectId(),
      userId: new mongoose.Types.ObjectId(),
      action: '  Task created  ',
    })

    expect(activity.action).toBe('Task created')
  })

  test('does not allow action longer than 200 characters', () => {
    const activity = new Activity({
      boardId: new mongoose.Types.ObjectId(),
      taskId: new mongoose.Types.ObjectId(),
      userId: new mongoose.Types.ObjectId(),
      action: 'a'.repeat(201),
    })

    const error = activity.validateSync()

    expect(error.errors.action).toBeDefined()
  })

  test('sets the at field automatically', () => {
    const activity = new Activity({
      boardId: new mongoose.Types.ObjectId(),
      taskId: new mongoose.Types.ObjectId(),
      userId: new mongoose.Types.ObjectId(),
      action: 'Task created',
    })

    expect(activity.at).toBeInstanceOf(Date)
  })

  test('does not enable timestamps', () => {
    expect(Activity.schema.options.timestamps).toBe(false)
  })
})