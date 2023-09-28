const { validation } = require("../middlewares");
const { transactionSchema } = require("../schemas/transactionSchema");
const {
  getTransactions,
  addTransaction,
  removeTransaction,
  getTransactionWithId,
  update,
} = require("../services/transactionsServices");
const {
  updateBalanceAfterChange,
  updateBalance,
  updateBalanceAfterDelete,
} = require("./userController");

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
  const balance = req.user.balance;
  const newTransaction = await addTransaction(userId, body);

  // Update stanu konta
  const newBalance = await updateBalance(
    userId,
    balance,
    newTransaction.income,
    newTransaction.sum
  );
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      balance: newBalance.balance,
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
  const balance = req.user.balance;
  // Update stanu konta po usunięciu transakcji
  const currentTransaction = await getTransactionWithId(transactionId, userId);
  const newBalance = await updateBalanceAfterDelete(
    userId,
    balance,
    currentTransaction.income,
    currentTransaction.sum
  );

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
    data: { result, balance: newBalance.balance },
  });
};
const updateTransaction = async (req, res, next) => {
  validation(transactionSchema);
  const { body } = req;
  const userId = req.user.id;
  const balance = req.user.balance;
  const transactionId = req.params.transactionId;
  const oldSum = await getTransactionWithId(transactionId, userId);
  console.log(oldSum.sum);
  const result = await update(transactionId, userId, body);
  if (!result) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Transaction not found",
    });
  }
  // Update stanu konta po aktualizacji
  const newBalance = await updateBalanceAfterChange(
    userId,
    balance,
    body.income,
    oldSum.sum,
    body.sum
  );
  console.log(body.income, oldSum.sum, body.sum, balance, newBalance);
  return res.status(200).json({
    status: "ok",
    code: 200,
    message: "Transaction update",
    data: { result, balance: newBalance.balance },
  });
};
module.exports = {
  getAllTransactions,
  createTransaction,
  deleteTransaction,
  getTransactionById,
  updateTransaction,
};
