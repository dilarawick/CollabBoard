// Task model - member contribution
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  columnId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String },
  assigneeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, required: true },
  priority: { type: String, required: true },
  dueDate: { type: Date },
  position: { type: Number, required: true },
  version: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
