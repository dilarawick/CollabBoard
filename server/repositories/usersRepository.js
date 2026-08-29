const { users } = require('../mockdata')

let usersList = [...users]

function getAllUsers() {
  return usersList
}

function getUserByEmail(email) {
  return usersList.find((user) => user.email === email)
}

function getUserById(id) {
  return usersList.find((user) => user._id === id)
}

function createUser(userData) {
  const newUser = {
    _id: Date.now().toString(),
    email: userData.email,
    passwordHash: userData.passwordHash,
    name: userData.name,
    createdAt: new Date()
  }
  usersList.push(newUser)
  return newUser
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser
}
