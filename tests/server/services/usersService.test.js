const usersRepository = require('../../../server/repositories/usersRepository')

const {
  fetchAllUsers,
  fetchUserById
} = require('../../../server/services/usersService')

jest.mock('../../../server/repositories/usersRepository')

describe('Users Service', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchAllUsers', () => {

    test('should return all users with passwordHash stripped', async () => {

      usersRepository.getAllUsers.mockResolvedValue([
        { _id: '1', email: 'a@test.com', name: 'A', passwordHash: 'secret1' },
        { _id: '2', email: 'b@test.com', name: 'B', passwordHash: 'secret2' }
      ])

      const result = await fetchAllUsers()

      expect(usersRepository.getAllUsers)
        .toHaveBeenCalled()

      expect(result).toEqual([
        { _id: '1', email: 'a@test.com', name: 'A' },
        { _id: '2', email: 'b@test.com', name: 'B' }
      ])

      result.forEach((user) => {
        expect(user.passwordHash).toBeUndefined()
      })

    })

  })

  describe('fetchUserById', () => {

    test('should return a sanitized user by id', async () => {

      usersRepository.getUserById.mockResolvedValue({
        _id: '123', email: 'test@example.com', name: 'Test User', passwordHash: 'secret-hash'
      })

      const result = await fetchUserById('123')

      expect(usersRepository.getUserById)
        .toHaveBeenCalledWith('123')

      expect(result).toEqual({
        _id: '123', email: 'test@example.com', name: 'Test User'
      })

      expect(result.passwordHash).toBeUndefined()

    })

    test('should return null when user does not exist', async () => {

      usersRepository.getUserById.mockResolvedValue(null)

      const result = await fetchUserById('doesnotexist')

      expect(result).toBeNull()

    })

  })

})