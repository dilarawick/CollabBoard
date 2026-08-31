const authService = require('../services/authService')

function getUsers(_req, res) {
  const users = authService.listUsers()
  res.status(200).json(users)
}

function signup(req, res) {
  try {
    const user = authService.register(req.body)
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

function login(req, res) {
  try {
    const { email, password } = req.body
    const user = authService.authenticate(email, password)
    res.status(200).json(user)
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

module.exports = {
  getUsers,
  signup,
  login
}
