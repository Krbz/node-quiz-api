const Joi = require('joi');

module.exports = {
  Add: {
    body: {
      quiz: Joi.string().required(),
      coverage: Joi.number().min(0).max(100).required(),
    },
  },
  Get: {
    body: {
      quiz: Joi.string().required(),
    },
  },
};
