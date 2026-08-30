// Repository layer for managing activity data using mock data
const { activities } = require('../mockdata')

let activitiesList = [...activities]

function getAllActivities() {
  return activitiesList
}

function getActivityById(id) {
  return activitiesList.find((activity) => activity._id === id)
}

function getActivitiesByBoardId(boardId) {
  return activitiesList.filter((activity) => activity.boardId === boardId)
}

function getActivitiesByTaskId(taskId) {
  return activitiesList.filter((activity) => activity.taskId === taskId)
}

function getActivitiesByUserId(userId) {
  return activitiesList.filter((activity) => activity.userId === userId)
}

function createActivity(activityData) {
  const newActivity = {
    _id: Date.now().toString(),
    boardId: activityData.boardId,
    taskId: activityData.taskId,
    userId: activityData.userId,
    action: activityData.action,
    at: activityData.at || new Date()
  }

  activitiesList.push(newActivity)

  return newActivity
}

function deleteActivity(id) {
  const index = activitiesList.findIndex((activity) => activity._id === id)

  if (index === -1) return false

  activitiesList.splice(index, 1)

  return true
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivitiesByBoardId,
  getActivitiesByTaskId,
  getActivitiesByUserId,
  createActivity,
  deleteActivity
}