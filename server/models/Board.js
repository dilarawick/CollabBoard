const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true, enum: ['owner', 'editor', 'viewer'] }
});

const columnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  position: { type: Number, required: true }
});

const boardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [memberSchema],
  columns: [columnSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Board', boardSchema);
