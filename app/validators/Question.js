const Joi = require('joi');

module.exports = {
  Add: {
    body: {
      title: Joi.string().required(),
      type: Joi.string().required(),
      score: Joi.number().required(),
      time: Joi.number().required(),
      answers: Joi.array().required().items(Joi.object().keys({
        title: Joi.string().required(),
        id: Joi.string().min(10).required(),
      }).min(1)),
    },
  },
  Get: {
    body: {
      quiz: Joi.string().required(),
    },
  },
};
