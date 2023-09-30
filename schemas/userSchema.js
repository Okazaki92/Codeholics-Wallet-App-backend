const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
  balance: Joi.number(),
  token: Joi.string(),
  verificationToken: Joi.string(),
});

module.exports = { userSchema };
