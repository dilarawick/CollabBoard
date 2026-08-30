const users = require('./users');
const boards = require('./boards');
const tasks = require('./tasks');
const activities = require('./activities');

// Export all mock data for use across the server
module.exports = {
  users,
  boards,
  tasks,
  activities
};