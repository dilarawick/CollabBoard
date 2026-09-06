const mongoose = require('mongoose')
const User = require('../models/User')
const { users: mockUsers } = require('../mockdata')

let usersList = [...mockUsers]

function isDbConnected() {
  return mongoose.connection.readyState === 1
}

function sanitizeUser(user) {
  if (!user) return null
  const { passwordHash, ...safeUser } = user
  return safeUser
}

async function getAllUsers() {
  if (isDbConnected()) {
    const users = await User.find({}).lean()
    return users.map(sanitizeUser)
  }
  return usersList.map(sanitizeUser)
}

async function getUserByEmail(email) {
  if (isDbConnected()) {
    return User.findOne({ email }).lean()
  }
  return usersList.find((user) => user.email === email)
}

async function getUserById(id) {
  if (isDbConnected()) {
    return User.findById(id).lean()
  }
  return usersList.find((user) => user._id === id)
}

async function createUser(userData) {
  if (isDbConnected()) {
    const user = await User.create(userData)
    return sanitizeUser(user.toObject())
  }

  const newUser = {
    _id: Date.now().toString(),
    email: userData.email,
    passwordHash: userData.passwordHash,
    name: userData.name,
    createdAt: new Date()
  }
  usersList.push(newUser)
  return sanitizeUser(newUser)
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser
}
