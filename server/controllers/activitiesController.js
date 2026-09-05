const activitiesService = require('../services/activitiesService')

// GET /api/activities?boardId=...&taskId=...&userId=...
async function getActivities(req, res) {
  try {
    const { boardId, taskId, userId } = req.query

    const activities = await activitiesService.listActivities({
      boardId,
      taskId,
      userId,
    })

    res.status(200).json(activities)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// GET /api/activities/:id
async function getActivityById(req, res) {
  try {
    const activity = await activitiesService.getActivity(req.params.id)

    res.status(200).json(activity)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// POST /api/activities
async function createActivity(req, res) {
  try {
    const activity = await activitiesService.addActivity(req.body)

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