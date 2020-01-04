const Joi = require('@hapi/joi');

const sv = Joi.object({
  username: Joi.string()
    .min(6)
    .required(),
  email: Joi.string()
    .min(5)
    .required()
    .email(),
  password: Joi.string()
    .min(10)
    .required()
});

const lv = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = { sv, lv };
