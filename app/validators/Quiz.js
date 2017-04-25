const Joi = require('joi');

module.exports = {
  Add: {
    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      type: Joi.string().required(),
      author: Joi.string().required(),
    },
  },
};
