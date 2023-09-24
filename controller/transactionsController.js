const { transactionSchema } = require("../schemas/transactionSchema");
const {
  getTransactions,
  addTransaction,
  removeTransaction,
  getTransactionWithId,
} = require("../services/transactionsServices");

const getAllTransactions = async (req, res, next) => {
  const { query } = req;
  const userId = req.user.id;
  const results = await getTransactions(query, userId);

  res.json({
    status: "success",
    code: 200,
    data: {
      transactions: results,
    },
  });
};

const createTransaction = async (req, res, next) => {
  const validators = transactionSchema.validate(req.body);
  if (validators.error?.message) {
    return res.status(400).json({ message: validators.error.message });
  }

  const { body } = req;
  const userId = req.user.id;
  const newTransaction = await addTransaction(userId, body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      transaction: newTransaction,
    },
  });
};

const getTransactionById = async (req, res, next) => {
  const { query } = req;
  const transactionId = req.params.transactionId;
  const result = await getTransactionWithId(query, transactionId);
  if (!result) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Transaction not found",
    });
  }
  return res.status(200).json({
    status: "ok",
    code: 200,
    data: { result },
  });
};

const deleteTransaction = async (req, res, next) => {
  const transactionId = req.params.transactionId;
  const result = await removeTransaction(transactionId);
  if (!result) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Transaction not found",
    });
  }
  return res.status(200).json({
    status: "ok",
    code: 200,
    message: "Transaction deleted",
    data: { result },
  });
};
module.exports = {
  getAllTransactions,
  createTransaction,
  deleteTransaction,
  getTransactionById,
};
