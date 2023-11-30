const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: 'user' }, // 'admin' or 'user'
  membership: { type: Boolean, default: false },
  // Add other necessary fields
});

module.exports = mongoose.model('User', userSchema);

