const express = require('express')
const router = express.Router()

const {
  getActivities,
  getActivityById,
  createActivity,
} = require('../controllers/activitiesController')

router.get('/', getActivities)
router.get('/:id', getActivityById)
router.post('/', createActivity)

module.exports = router
