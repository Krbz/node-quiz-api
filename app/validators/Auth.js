const Joi = require('joi');

module.exports = {
  verifyAuth: {
    body: {
      token: Joi.string().required(),
    },
  },
};
