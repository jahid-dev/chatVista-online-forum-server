const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  feedback: String,
  reportStatus: { type: Boolean, default: false },
  // Add other necessary fields
});

module.exports = mongoose.model('Comment', commentSchema);
