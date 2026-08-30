const usersRepository = require('../repositories/usersRepository');

function sanitizeUser(user) {
  if (!user) return null;
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

async function fetchAllUsers() {
  const users = usersRepository.getAllUsers();
  return users.map(sanitizeUser);
}

async function fetchUserById(id) {
  const user = usersRepository.getUserById(id);
  return sanitizeUser(user);
}

module.exports = { fetchAllUsers, fetchUserById };