const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  at: { type: Date, default: Date.now }
}, {
  timestamps: false
});

module.exports = mongoose.model('Activity', activitySchema);
