const Joi = require("joi");

const transactionSchema = Joi.object({
  date: Joi.date().iso().raw().messages({
    "date.base": "Date must be a valid ISO date (YYYY-MM-DD)",
    "date.format": "Format must be YYYY-MM-DD",
    "any.required": "Date is a required field",
  }),
  income: Joi.boolean(),
  category: Joi.string(),
  comment: Joi.string(),
  sum: Joi.number().positive().required(),
});

module.exports = { transactionSchema };
