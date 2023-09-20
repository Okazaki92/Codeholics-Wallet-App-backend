const Joi = require("joi");

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
  verificationToken: Joi.string(),
  wallet: Joi.array(),
});

module.exports = { userSchema };
