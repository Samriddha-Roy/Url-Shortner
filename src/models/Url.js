const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    maxlength: 2048,
    trim: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    index: true,
    match: /^[A-Za-z0-9_-]{7}$/
  },
  clicks: {
    type: Number,
    default: 0,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000 // 30 days TTL
  }
});

// Compound index for better query performance
urlSchema.index({ originalUrl: 1, createdAt: -1 });

module.exports = mongoose.model('Url', urlSchema);
