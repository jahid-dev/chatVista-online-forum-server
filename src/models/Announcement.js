const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  // Add other necessary fields
});

module.exports = mongoose.model('Announcement', announcementSchema);
