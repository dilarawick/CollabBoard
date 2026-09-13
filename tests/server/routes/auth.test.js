const express = require('express')
const request = require('supertest')

const authRoutes = require('../../../server/routes/auth')

const authController = require('../../../server/controllers/authController')

jest.mock('../../../server/controllers/authController')

describe('Auth Routes', () => {

  let app

  beforeEach(() => {

    app = express()

    app.use(express.json())

    app.use('/auth', authRoutes)

    jest.clearAllMocks()

  })

  describe('GET /auth/users', () => {

    test('should call getUsers controller', async () => {

      authController.getUsers.mockImplementation(
        (_req, res) => {
          res.status(200).json([])
        }
      )

      const response = await request(app)
        .get('/auth/users')

      expect(response.status).toBe(200)

      expect(authController.getUsers)
        .toHaveBeenCalled()

    })

  })

  describe('POST /auth/signup', () => {

    test('should call signup controller', async () => {

      authController.signup.mockImplementation(
        (req, res) => {
          res.status(201).json({
            message: 'Signup successful'
          })
        }
      )

      const response = await request(app)
        .post('/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'Test@12345',
          name: 'Test User'
        })

      expect(response.status).toBe(201)

      expect(authController.signup)
        .toHaveBeenCalled()

    })

  })

  describe('POST /auth/login', () => {

    test('should call login controller', async () => {

      authController.login.mockImplementation(
        (req, res) => {
          res.status(200).json({
            message: 'Login successful'
          })
        }
      )

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Test@12345'
        })

      expect(response.status).toBe(200)

      expect(authController.login)
        .toHaveBeenCalled()

    })

  })

})