const { users } = require('../mockdata')

// Creates a working copy of the mock users for repository operations.
let usersList = [...users]

// Returns all users currently stored in the repository.
function getAllUsers() {
  return usersList
}
// Finds a user by their email address.
function getUserByEmail(email) {
  return usersList.find((user) => user.email === email)
}
// Finds a user by their unique ID.
function getUserById(id) {
  return usersList.find((user) => user._id === id)
}
// Creates a new user and adds it to the users list.
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
