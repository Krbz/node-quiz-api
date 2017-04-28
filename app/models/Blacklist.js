const mongoose = require('../../libs/mongoose');

const Schema = {
  token: {
    type: String,
  },
  user: {
    type: Object,
  },
  reason: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
};

module.exports = mongoose.model('blacklist', Schema);
