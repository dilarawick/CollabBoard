const activitiesService = require('../services/activitiesService')

// GET /api/activities?boardId=...&taskId=...
function getActivities(req, res) {
  try {
    const { boardId, taskId } = req.query
    const activities = activitiesService.listActivities({ boardId, taskId })
    res.status(200).json(activities)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// GET /api/activities/:id
function getActivityById(req, res) {
  try {
    const activity = activitiesService.getActivity(req.params.id)
    res.status(200).json(activity)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// POST /api/activities  -  body: { boardId, taskId, userId, action }
function createActivity(req, res) {
  try {
    const activity = activitiesService.addActivity(req.body)
    res.status(201).json(activity)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getActivities,
  getActivityById,
  createActivity,
}
