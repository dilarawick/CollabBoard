const express = require('express');
const router = express.Router();
const boardsController = require('../controllers/boardsController');

router.get('/', boardsController.getAllBoards);
router.get('/:id', boardsController.getBoardById);

module.exports = router;