// These tests run without a live MongoDB connection, so boardsRepository
// exercises its in-memory fallback path (mongoose.connection.readyState !== 1).
// Each test re-requires the repository after jest.resetModules() so the
// module-level `boardsList` array starts fresh and mutations in one test
// can't leak into another.

const seedBoards = require('../../../server/mockdata/boards')

function loadRepository() {
  jest.resetModules()
  return require('../../../server/repositories/boardsRepository')
}

describe('boardsRepository (in-memory fallback)', () => {
  let boardsRepository

  beforeEach(() => {
    boardsRepository = loadRepository()
  })

  test('getAllBoards returns all seeded boards', async () => {
    const boards = await boardsRepository.getAllBoards()
    expect(boards).toHaveLength(seedBoards.length)
  })

  test('getBoardById returns the matching board', async () => {
    const target = seedBoards[0]
    const board = await boardsRepository.getBoardById(target._id)
    expect(board).toBeDefined()
    expect(board.name).toBe(target.name)
  })

  test('getBoardById returns undefined for an unknown id', async () => {
    const board = await boardsRepository.getBoardById('does-not-exist')
    expect(board).toBeUndefined()
  })

  test('getBoardsByOwnerId returns only boards owned by that user', async () => {
    const ownerId = seedBoards[0].ownerId
    const boards = await boardsRepository.getBoardsByOwnerId(ownerId)
    expect(boards.length).toBeGreaterThan(0)
    boards.forEach((board) => expect(board.ownerId).toBe(ownerId))
  })

  test('getBoardsByMemberId returns only boards that include that member', async () => {
    const memberId = seedBoards[0].members[1].userId
    const boards = await boardsRepository.getBoardsByMemberId(memberId)
    expect(boards.length).toBeGreaterThan(0)
    boards.forEach((board) => {
      expect(board.members.some((m) => m.userId === memberId)).toBe(true)
    })
  })

  test('createBoard adds a new board with an owner member by default', async () => {
    // Note: the in-memory fallback returns the live array by reference, so we
    // snapshot the count up front rather than holding onto the array itself.
    const beforeCount = (await boardsRepository.getAllBoards()).length
    const created = await boardsRepository.createBoard({
      name: 'New Board',
      ownerId: 'user-123'
    })

    expect(created._id).toBeDefined()
    expect(created.name).toBe('New Board')
    expect(created.members).toEqual([{ userId: 'user-123', role: 'owner' }])
    expect(created.columns).toEqual([])

    const after = await boardsRepository.getAllBoards()
    expect(after).toHaveLength(beforeCount + 1)
  })

  test('createBoard respects explicitly provided members and columns', async () => {
    const created = await boardsRepository.createBoard({
      name: 'Custom Board',
      ownerId: 'user-123',
      members: [{ userId: 'user-123', role: 'owner' }, { userId: 'user-456', role: 'editor' }],
      columns: [{ title: 'Backlog', position: 0 }]
    })

    expect(created.members).toHaveLength(2)
    expect(created.columns).toHaveLength(1)
  })

  test('updateBoard updates fields on an existing board', async () => {
    const target = seedBoards[0]
    const updated = await boardsRepository.updateBoard(target._id, { name: 'Renamed' })
    expect(updated.name).toBe('Renamed')

    const fetched = await boardsRepository.getBoardById(target._id)
    expect(fetched.name).toBe('Renamed')
  })

  test('updateBoard returns null for an unknown id', async () => {
    const updated = await boardsRepository.updateBoard('does-not-exist', { name: 'X' })
    expect(updated).toBeNull()
  })

  test('deleteBoard removes an existing board and returns true', async () => {
    const target = seedBoards[0]
    const result = await boardsRepository.deleteBoard(target._id)
    expect(result).toBe(true)

    const fetched = await boardsRepository.getBoardById(target._id)
    expect(fetched).toBeUndefined()
  })

  test('deleteBoard returns false for an unknown id', async () => {
    const result = await boardsRepository.deleteBoard('does-not-exist')
    expect(result).toBe(false)
  })

  test('addMember appends a member to an existing board', async () => {
    const target = seedBoards[0]
    // Same aliasing caveat as above: snapshot the member count, not the object.
    const beforeCount = (await boardsRepository.getBoardById(target._id)).members.length
    const updated = await boardsRepository.addMember(target._id, { userId: 'new-user', role: 'viewer' })

    expect(updated.members).toHaveLength(beforeCount + 1)
    expect(updated.members.some((m) => m.userId === 'new-user' && m.role === 'viewer')).toBe(true)
  })

  test('addMember returns null for an unknown board id', async () => {
    const updated = await boardsRepository.addMember('does-not-exist', { userId: 'x', role: 'viewer' })
    expect(updated).toBeNull()
  })

  test('removeMember removes a matching member from an existing board', async () => {
    const target = seedBoards[0]
    const memberToRemove = target.members[1].userId
    const updated = await boardsRepository.removeMember(target._id, memberToRemove)

    expect(updated.members.some((m) => m.userId === memberToRemove)).toBe(false)
  })

  test('removeMember returns null for an unknown board id', async () => {
    const updated = await boardsRepository.removeMember('does-not-exist', 'some-user')
    expect(updated).toBeNull()
  })
})
