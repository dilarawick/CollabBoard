const bcrypt = require('bcrypt')
const usersRepository = require('../repositories/usersRepository')

function listUsers() {
  return usersRepository.getAllUsers()
}

function findUserByEmail(email) {
  return usersRepository.getUserByEmail(email)
}

function register(userData) {
  const existing = usersRepository.getUserByEmail(userData.email)
  if (existing) {
    throw new Error('Email already registered')
  }

  const passwordHash = bcrypt.hashSync(userData.password, 10)
  return usersRepository.createUser({
    email: userData.email,
    passwordHash,
    name: userData.name
  })
}

function authenticate(email, password) {
  const user = usersRepository.getUserByEmail(email)
  if (!user) {
    throw new Error('Invalid email or password')
  }

  const valid = bcrypt.compareSync(password, user.passwordHash)
  if (!valid) {
    throw new Error('Invalid email or password')
  }

  return {
    _id: user._id,
    email: user.email,
    name: user.name
  }
}

module.exports = {
  listUsers,
  findUserByEmail,
  register,
  authenticate
}
