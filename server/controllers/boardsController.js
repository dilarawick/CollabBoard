const boardsService = require('../services/boardsService')

async function getAllBoards(req, res) {
  try {
    const boards = await boardsService.listBoards()
    res.status(200).json(boards)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch boards' })
  }
}

async function getBoardById(req, res) {
  try {
    const board = await boardsService.getBoard(req.params.id)
    if (!board) return res.status(404).json({ error: 'Board not found' })
    res.status(200).json(board)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch board' })
  }
}

module.exports = { getAllBoards, getBoardById }
