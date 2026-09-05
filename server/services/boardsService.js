// Service layer for board business logic.
// All functions are async because the repository may hit real MongoDB.
const boardsRepository = require('../repositories/boardsRepository')

const VALID_ROLES = ['owner', 'editor', 'viewer']

async function listBoards() {
  return boardsRepository.getAllBoards()
}

async function getBoard(id) {
  return boardsRepository.getBoardById(id)
}

async function listBoardsForUser(userId) {
  return boardsRepository.getBoardsByMemberId(userId)
}

async function addBoard(boardData) {
  if (!boardData.name || !boardData.ownerId) {
    throw new Error('Missing required fields')
  }

  return boardsRepository.createBoard(boardData)
}

async function modifyBoard(id, updates) {
  const existing = await boardsRepository.getBoardById(id)

  if (!existing) {
    throw new Error('Board not found')
  }

  return boardsRepository.updateBoard(id, updates)
}

async function removeBoard(id) {
  const existing = await boardsRepository.getBoardById(id)

  if (!existing) {
    throw new Error('Board not found')
  }

  return boardsRepository.deleteBoard(id)
}

async function addBoardMember(boardId, memberData) {
  const board = await boardsRepository.getBoardById(boardId)

  if (!board) {
    throw new Error('Board not found')
  }

  if (!memberData.userId || !memberData.role) {
    throw new Error('Missing required fields')
  }

  if (!VALID_ROLES.includes(memberData.role)) {
    throw new Error('Invalid role')
  }

  const alreadyMember = board.members.some(
    (m) => String(m.userId) === String(memberData.userId)
  )

  if (alreadyMember) {
    throw new Error('User is already a member of this board')
  }

  return boardsRepository.addMember(boardId, memberData)
}

async function removeBoardMember(boardId, userId) {
  const board = await boardsRepository.getBoardById(boardId)

  if (!board) {
    throw new Error('Board not found')
  }

  return boardsRepository.removeMember(boardId, userId)
}

module.exports = {
  listBoards,
  getBoard,
  listBoardsForUser,
  addBoard,
  modifyBoard,
  removeBoard,
  addBoardMember,
  removeBoardMember
}
