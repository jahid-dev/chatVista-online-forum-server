const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  feedback: String,
  // Add other necessary fields
});

module.exports = mongoose.model('Report', reportSchema);
