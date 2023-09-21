const Joi = require("joi");

const transactionSchema = Joi.object({
  Date: Joi.date().required(),
  Type: Joi.string().valid("income", "expense").required().messages({
    "string.base": "Type must be a string",
    "any.required": "Missing field Type transaction",
    "any.only":
      "Type transaction must be one of these values - [income, expense]",
  }),
  Category: Joi.string(),
  Comment: Joi.string(),
  Sum: Joi.number().positive().required(),
});

module.exports = { transactionSchema };
