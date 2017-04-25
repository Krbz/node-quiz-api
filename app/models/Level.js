const mongoose = require('../../libs/mongoose');

const Schema = {
  quiz: {
    type: String,
  },
  unlocked: {
    type: Boolean,
  },
  author: {
    type: String,
  },
  coverage: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
};

module.exports = mongoose.model('level', Schema);
