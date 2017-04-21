const Joi = require('joi');

const Auth = {
  verifyAuth: {
    body: {
      token: Joi.string().required(),
    },
  },
};

module.exports = Auth;
