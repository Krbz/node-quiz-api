const mongoose = require('../../libs/mongoose');

const quizSchema = {
  title: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
    require: true,
  },
  type: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
};

module.exports = mongoose.model('quiz', quizSchema);
