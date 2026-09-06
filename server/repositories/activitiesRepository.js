const Activity = require('../models/Activity')

// Retrieves all activities from MongoDB, sorted by newest first.
async function getAllActivities() {
  return Activity.find().sort({ at: -1 })
}

// Retrieves a single activity using its MongoDB document ID.
async function getActivityById(id) {
  return Activity.findById(id)
}

// Retrieves all activities associated with a specific board.
async function getActivitiesByBoardId(boardId) {
  return Activity.find({ boardId }).sort({ at: -1 })
}

async function getActivitiesByTaskId(taskId) {
  return Activity.find({ taskId }).sort({ at: -1 })
}

async function getActivitiesByUserId(userId) {
  return Activity.find({ userId }).sort({ at: -1 })
}

async function createActivity(activityData) {
  const activity = new Activity(activityData)
  return activity.save()
}

async function deleteActivity(id) {
  const result = await Activity.findByIdAndDelete(id)
  return result !== null
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivitiesByBoardId,
  getActivitiesByTaskId,
  getActivitiesByUserId,
  createActivity,
  deleteActivity,
}