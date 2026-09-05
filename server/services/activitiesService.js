const activitiesRepository = require('../repositories/activitiesRepository')

async function listActivities({ boardId, taskId, userId } = {}) {
  if (boardId) {
    return activitiesRepository.getActivitiesByBoardId(boardId)
  }

  if (taskId) {
    return activitiesRepository.getActivitiesByTaskId(taskId)
  }

  if (userId) {
    return activitiesRepository.getActivitiesByUserId(userId)
  }

  return activitiesRepository.getAllActivities()
}

async function getActivity(id) {
  const activity = await activitiesRepository.getActivityById(id)

  if (!activity) {
    throw new Error('Activity not found')
  }

  return activity
}

async function addActivity(activityData) {
  if (
    !activityData.boardId ||
    !activityData.taskId ||
    !activityData.userId ||
    !activityData.action
  ) {
    throw new Error('Missing required fields')
  }

  return activitiesRepository.createActivity(activityData)
}

async function removeActivity(id) {
  const existing = await activitiesRepository.getActivityById(id)

  if (!existing) {
    throw new Error('Activity not found')
  }

  return activitiesRepository.deleteActivity(id)
}

module.exports = {
  listActivities,
  getActivity,
  addActivity,
  removeActivity,
}