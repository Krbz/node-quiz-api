const mongoose = require('mongoose');

const userSchema = {
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
};

module.exports = mongoose.model('users', userSchema);
