const jwt = require('jsonwebtoken')
const authMiddleware = require('../../../server/middleware/authMiddleware')

describe('authMiddleware', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret'
  })

  test('should reject request when authorization header is missing', () => {
    const req = {
      headers: {}
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const next = jest.fn()

    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)

    expect(res.json).toHaveBeenCalledWith({
      message: 'Access denied. No token provided.'
    })

    expect(next).not.toHaveBeenCalled()
  })

  test('should reject request when token is invalid', () => {
    const req = {
      headers: {
        authorization: 'Bearer invalid-token'
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const next = jest.fn()

    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)

    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid or expired token.'
    })

    expect(next).not.toHaveBeenCalled()
  })

  test('should allow request when token is valid', () => {
    const user = {
      id: '123',
      email: 'test@example.com',
      role: 'user'
    }

    const token = jwt.sign(user, process.env.JWT_SECRET)

    const req = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const next = jest.fn()

    authMiddleware(req, res, next)

    expect(next).toHaveBeenCalled()

    expect(req.user).toMatchObject(user)
  })
})