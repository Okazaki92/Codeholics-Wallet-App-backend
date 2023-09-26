const { validation } = require("../middlewares");
const { transactionSchema } = require("../schemas/transactionSchema");
const {
  getTransactions,
  addTransaction,
  removeTransaction,
  getTransactionWithId,
  update,
} = require("../services/transactionsServices");
const { updateWalletBalance } = require("./walletController");

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
  validation(transactionSchema);

  const { body } = req;
  const userId = req.user.id;
  const newTransaction = await addTransaction(userId, body);

  const { wallet } = req.user;
  await updateWalletBalance(wallet, newTransaction.Type, newTransaction.sum);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      transaction: newTransaction,
    },
  });
};

const getTransactionById = async (req, res, next) => {
  const transactionId = req.params.transactionId;
  const userId = req.user.id;
  const result = await getTransactionWithId(transactionId, userId);
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
  const userId = req.user.id;
  const result = await removeTransaction(transactionId, userId);
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
const updateTransaction = async (req, res, next) => {
  validation(transactionSchema);
  const { body } = req;
  const userId = req.user.id;
  const transactionId = req.params.transactionId;
  const result = await update(transactionId, userId, body);
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
    message: "Transaction update",
    data: { result },
  });
};
module.exports = {
  getAllTransactions,
  createTransaction,
  deleteTransaction,
  getTransactionById,
  updateTransaction,
};
