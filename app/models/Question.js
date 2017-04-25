const mongoose = require('../../libs/mongoose');

const Schema = {
  title: {
    type: String,
  },
  type: {
    type: String,
  },
  score: {
    type: Number,
  },
  time: {
    type: Number,
  },
  answers: {
    type: Array,
    keys: {
      title: {
        type: String,
      },
      id: {
        type: String,
        unique: true,
      },
    },
  },
  author: {
    type: String,
  },
  level: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
};

module.exports = mongoose.model('questions', Schema);
