const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  tags: [String],
  upVote: { type: Number, default: 0 },
  downVote: { type: Number, default: 0 },
  // Add other necessary fields
});

module.exports = mongoose.model('Post', postSchema);
