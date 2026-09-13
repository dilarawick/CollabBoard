const express = require('express')

const router = express.Router()

const tasksController = require('../controllers/tasksController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, tasksController.getTasks)

router.post('/', authMiddleware, tasksController.createTask)

router.patch('/:id', authMiddleware, tasksController.updateTask)

router.delete('/:id', authMiddleware, tasksController.deleteTask)

module.exports = router