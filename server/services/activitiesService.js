import * as activitiesRepository from '../repositories/activitiesRepository.js'

export function listActivities() {
  return activitiesRepository.getAllActivities()
}

export function getActivity(id) {
  return activitiesRepository.getActivityById(id)
}

export function getActivitiesByBoardId(boardId) {
  return activitiesRepository.getActivitiesByBoardId(boardId)
}

export function getActivitiesByTaskId(taskId) {
  return activitiesRepository.getActivitiesByTaskId(taskId)
}

export function getActivitiesByUserId(userId) {
  return activitiesRepository.getActivitiesByUserId(userId)
}

export function addActivity(activityData) {
  if (!activityData.boardId || !activityData.taskId || !activityData.userId || !activityData.action) {
    throw new Error('Missing required fields')
  }

  return activitiesRepository.createActivity(activityData)
}

export function removeActivity(id) {
  const existing = activitiesRepository.getActivityById(id)

  if (!existing) {
    throw new Error('Activity not found')
  }

  return activitiesRepository.deleteActivity(id)
}