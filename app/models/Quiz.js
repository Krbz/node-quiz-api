const mongoose = require('../../libs/mongoose');

const Schema = {
  title: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  type: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
};

module.exports = mongoose.model('quiz', Schema);
