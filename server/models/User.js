const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.model('User', userSchema);
