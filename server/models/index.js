// Central export point for all application models
const User = require('./User');
const Board = require('./Board');
const Task = require('./Task');
const Activity = require('./Activity');

module.exports = {
  User,
  Board,
  Task,
  Activity
};
