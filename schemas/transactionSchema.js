const Joi = require("joi");

const transactionSchema = Joi.object({
  Date: Joi.date().iso().raw().messages({
    "date.base": "Date must be a valid ISO date (YYYY-MM-DD)",
    "date.format": "Format must be YYYY-MM-DD",
    "any.required": "Date is a required field",
  }),
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
