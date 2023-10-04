const { use } = require("passport");
const { validation } = require("../middlewares");
const { transactionSchema } = require("../schemas/transactionSchema");
const {
  getTransactions,
  addTransaction,
  removeTransaction,
  getTransactionWithId,
  update,
  countTransactions,
} = require("../services/transactionsServices");
const {
  handle200,
  handle201,
  handle404,
  handle500,
} = require("../utils/handleErrors");
const {
  updateBalanceAfterChange,
  updateBalance,
  updateBalanceAfterDelete,
} = require("./userController");

const getAllTransactions = async (req, res, next) => {
  try {
    const { query } = req;
    const userId = req.user.id;
    const results = await getTransactions(query, userId);
    const total = await countTransactions(userId);
    handle200(res, "Success! Transactions received.", {
      transactions: results,
      total: total.length,
    });
  } catch (error) {
    next(error);
  }
};

const createTransaction = async (req, res, next) => {
  try {
    if (validation(req, res, transactionSchema)) {
      return;
    }

    const { body } = req;
    const userId = req.user.id;
    const balance = req.user.balance;
    const newTransaction = await addTransaction(userId, body);
    if (!newTransaction) {
      return handle500(res);
    }
    // Update stanu konta
    const newBalance = await updateBalance(
      userId,
      balance,
      newTransaction.income,
      newTransaction.sum
    );
    handle201(res, "New transaction added.", {
      transaction: newTransaction,
      balance: newBalance.balance,
    });
  } catch (error) {
    next(error);
  }
};

const getTransactionById = async (req, res, next) => {
  const transactionId = req.params.transactionId;
  const userId = req.user.id;
  const result = await getTransactionWithId(transactionId, userId);
  if (!result) {
    return handle404(res, "Transaction Not found");
  }
  handle200(res, "Success ! Transaction received.", { result });
};

const deleteTransaction = async (req, res, next) => {
  const transactionId = req.params.transactionId;
  const userId = req.user.id;
  const balance = req.user.balance;
  // Update stanu konta po usunięciu transakcji
  const currentTransaction = await getTransactionWithId(transactionId, userId);
  if (!currentTransaction) {
    return handle404(res, "Transaction Not Found");
  }
  const newBalance = await updateBalanceAfterDelete(
    userId,
    balance,
    currentTransaction.income,
    currentTransaction.sum
  );

  const result = await removeTransaction(transactionId, userId);
  if (!result) {
    return handle404(res, "Transaction Not Found");
  }
  handle200(res, "Transaction deleted", {
    result,
    balance: newBalance.balance,
  });
};
const updateTransaction = async (req, res, next) => {
  if (validation(req, res, transactionSchema)) {
    return;
  }
  const { body } = req;
  const userId = req.user.id;
  const balance = req.user.balance;
  const transactionId = req.params.transactionId;
  const oldSum = await getTransactionWithId(transactionId, userId);
  const result = await update(transactionId, userId, body);
  if (!result || !oldSum) {
    return handle404(res, "Transaction not found");
  }
  // Update stanu konta po aktualizacji
  const newBalance = await updateBalanceAfterChange(
    userId,
    balance,
    body.income,
    oldSum.sum,
    body.sum
  );
  handle200(res, "Transaction update", { result, balance: newBalance.balance });
};
module.exports = {
  getAllTransactions,
  createTransaction,
  deleteTransaction,
  getTransactionById,
  updateTransaction,
};
