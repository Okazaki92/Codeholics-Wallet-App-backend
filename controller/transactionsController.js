const { transactionSchema } = require("../schemas/transactionSchema");
const {
  getTransactions,
  addTransaction,
} = require("../services/transactionsServices");

const get = async (req, res, next) => {
  const { query } = req;
  const results = await getTransactions(query);

  res.json({
    status: "success",
    code: 200,
    data: {
      transactions: results,
    },
  });
};

const getByCategory = async (req, res, next) => {


};

const getByMonthYear = async (req, res, next) => {


};

const create = async (req, res, next) => {
  const validators = transactionSchema.validate(req.body);
  if (validators.error?.message) {
    return res.status(400).json({ message: validators.error.message });
  }

  const { body } = req;
  const newTransaction = await addTransaction(body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      transaction: newTransaction,
    },
  });
};

module.exports = {
  get,
  create,
};
