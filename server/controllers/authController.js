const authService = require('../services/authService')
const { generateToken } = require('../utils/jwt')

async function getUsers(_req, res) {
  try {
    const users = await authService.listUsers()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

async function signup(req, res) {
  try {
    const user = await authService.register(req.body)
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body

    const user = await authService.authenticate(email, password)

    const token = generateToken(user)

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

module.exports = {
  getUsers,
  signup,
  login
}
