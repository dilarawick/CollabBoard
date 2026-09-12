const mongoose = require('mongoose')
const Board = require('../../../server/models/Board')

describe('Board model (schema validation)', () => {
  const validPayload = {
    name: 'Project Alpha',
    ownerId: new mongoose.Types.ObjectId(),
    members: [
      { userId: new mongoose.Types.ObjectId(), role: 'owner' }
    ],
    columns: [
      { title: 'To Do', position: 0 }
    ]
  }

  test('passes validation with all required fields', () => {
    const board = new Board(validPayload)
    const err = board.validateSync()
    expect(err).toBeUndefined()
  })

  test('fails validation when name is missing', () => {
    const board = new Board({ ...validPayload, name: undefined })
    const err = board.validateSync()
    expect(err).toBeDefined()
    expect(err.errors.name).toBeDefined()
  })

  test('fails validation when ownerId is missing', () => {
    const board = new Board({ ...validPayload, ownerId: undefined })
    const err = board.validateSync()
    expect(err).toBeDefined()
    expect(err.errors.ownerId).toBeDefined()
  })

  test('defaults members and columns to empty arrays when omitted', () => {
    const board = new Board({ name: 'No extras', ownerId: new mongoose.Types.ObjectId() })
    const err = board.validateSync()
    expect(err).toBeUndefined()
    expect(board.members).toHaveLength(0)
    expect(board.columns).toHaveLength(0)
  })

  test('fails validation when a member has an invalid role', () => {
    const board = new Board({
      ...validPayload,
      members: [{ userId: new mongoose.Types.ObjectId(), role: 'admin' }]
    })
    const err = board.validateSync()
    expect(err).toBeDefined()
    expect(err.errors['members.0.role']).toBeDefined()
  })

  test('fails validation when a member is missing userId', () => {
    const board = new Board({
      ...validPayload,
      members: [{ role: 'editor' }]
    })
    const err = board.validateSync()
    expect(err).toBeDefined()
    expect(err.errors['members.0.userId']).toBeDefined()
  })

  test('fails validation when a column is missing position', () => {
    const board = new Board({
      ...validPayload,
      columns: [{ title: 'To Do' }]
    })
    const err = board.validateSync()
    expect(err).toBeDefined()
    expect(err.errors['columns.0.position']).toBeDefined()
  })

  test('fails validation when a column is missing title', () => {
    const board = new Board({
      ...validPayload,
      columns: [{ position: 0 }]
    })
    const err = board.validateSync()
    expect(err).toBeDefined()
    expect(err.errors['columns.0.title']).toBeDefined()
  })

  test('accepts all three valid member roles', () => {
    ;['owner', 'editor', 'viewer'].forEach((role) => {
      const board = new Board({
        ...validPayload,
        members: [{ userId: new mongoose.Types.ObjectId(), role }]
      })
      const err = board.validateSync()
      expect(err).toBeUndefined()
    })
  })
})
