const Joi = require("joi");

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
  wallet: Joi.object(),
  token: Joi.string(),
  verificationToken: Joi.string(),
});

module.exports = { userSchema };
