const Joi = require('joi');

module.exports = {
  verifyAuth: {
    body: {
      token: Joi.string().required(),
    },
  },
  Login: {
    body: {
      login: Joi.string().min(3).required(),
      password: Joi.string().min(6).required(),
    },
  },
  Register: {
    body: {
      username: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  },
  Logout: {
    body: {
      token: Joi.string().required(),
      login: Joi.string().min(3).required(),
    },
  },
};
