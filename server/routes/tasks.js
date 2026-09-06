const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasksController')

router.get('/', tasksController.getTasks)
router.post('/', tasksController.createTask)
router.patch('/:id', tasksController.updateTask)
router.delete('/:id', tasksController.deleteTask)

module.exports = router
