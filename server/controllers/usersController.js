const usersService = require('../services/usersService');

async function getAllUsers(req, res) {
  try {
    const users = await usersService.fetchAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

async function getUserById(req, res) {
  try {
    const user = await usersService.fetchUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    console.error('Failed to fetch user:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

module.exports = { getAllUsers, getUserById };