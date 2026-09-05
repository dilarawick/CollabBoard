const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// GET /api/users - Get all users
router.get('/', usersController.getAllUsers);

// GET /api/users/:id - Get a user by ID
router.get('/:id', usersController.getUserById);

module.exports = router;