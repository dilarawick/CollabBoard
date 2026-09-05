// Repository layer for managing board data.
// Uses the real MongoDB Board model when connected; falls back to
// in-memory mock data otherwise (mirrors the fallback behavior in db/connect.js).
const mongoose = require('mongoose')
const Board = require('../models/Board')
const { boards } = require('../mockdata')

let boardsList = [...boards]

function isDbConnected() {
  return mongoose.connection.readyState === 1
}

async function getAllBoards() {
  if (isDbConnected()) {
    return Board.find({}).lean()
  }
  return boardsList
}

async function getBoardById(id) {
  if (isDbConnected()) {
    return Board.findById(id).lean()
  }
  return boardsList.find((board) => board._id === id)
}

async function getBoardsByOwnerId(ownerId) {
  if (isDbConnected()) {
    return Board.find({ ownerId }).lean()
  }
  return boardsList.filter((board) => board.ownerId === ownerId)
}

async function getBoardsByMemberId(userId) {
  if (isDbConnected()) {
    return Board.find({ 'members.userId': userId }).lean()
  }
  return boardsList.filter((board) =>
    board.members.some((member) => member.userId === userId)
  )
}

async function createBoard(boardData) {
  const payload = {
    name: boardData.name,
    ownerId: boardData.ownerId,
    members: boardData.members || [{ userId: boardData.ownerId, role: 'owner' }],
    columns: boardData.columns || []
  }

  if (isDbConnected()) {
    const board = await Board.create(payload)
    return board.toObject()
  }

  const newBoard = {
    _id: Date.now().toString(),
    ...payload,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  boardsList.push(newBoard)

  return newBoard
}

async function updateBoard(id, updates) {
  if (isDbConnected()) {
    return Board.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    ).lean()
  }

  const index = boardsList.findIndex((board) => board._id === id)

  if (index === -1) return null

  boardsList[index] = {
    ...boardsList[index],
    ...updates,
    updatedAt: new Date()
  }

  return boardsList[index]
}

async function deleteBoard(id) {
  if (isDbConnected()) {
    const result = await Board.findByIdAndDelete(id)
    return !!result
  }

  const index = boardsList.findIndex((board) => board._id === id)

  if (index === -1) return false

  boardsList.splice(index, 1)

  return true
}

async function addMember(boardId, member) {
  if (isDbConnected()) {
    return Board.findByIdAndUpdate(
      boardId,
      { $push: { members: member }, updatedAt: new Date() },
      { new: true }
    ).lean()
  }

  const board = boardsList.find((b) => b._id === boardId)

  if (!board) return null

  board.members.push(member)
  board.updatedAt = new Date()

  return board
}

async function removeMember(boardId, userId) {
  if (isDbConnected()) {
    return Board.findByIdAndUpdate(
      boardId,
      { $pull: { members: { userId } }, updatedAt: new Date() },
      { new: true }
    ).lean()
  }

  const board = boardsList.find((b) => b._id === boardId)

  if (!board) return null

  board.members = board.members.filter((m) => m.userId !== userId)
  board.updatedAt = new Date()

  return board
}

module.exports = {
  getAllBoards,
  getBoardById,
  getBoardsByOwnerId,
  getBoardsByMemberId,
  createBoard,
  updateBoard,
  deleteBoard,
  addMember,
  removeMember
}
