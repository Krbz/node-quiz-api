const Joi = require('joi');

const Quiz = {
  Add: {
    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      type: Joi.string().required(),
      author: Joi.string().required(),
    },
  },
};

module.exports = Quiz;
