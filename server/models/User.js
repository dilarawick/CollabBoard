const mongoose = require('mongoose');

// Defines the structure and validation rules for User documents.
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true }
}, {
    // Automatically records when a user is created.
  timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.model('User', userSchema);
