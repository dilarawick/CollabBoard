const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasksController')

// GET all tasks
router.get('/', tasksController.getTasks)

// POST create a new task
router.post('/', tasksController.createTask)

// PATCH update an existing task by ID
router.patch('/:id', tasksController.updateTask)

// DELETE remove a task by ID
router.delete('/:id', tasksController.deleteTask)

module.exports = router
