const { Transaction } = require("../models/transaction");

const getTransactions = async (query, userId) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 5;
  const startIndex = (page - 1) * limit;

  return Transaction.find({ owner: userId })
    .sort({ date: -1 })
    .skip(startIndex)
    .limit(limit);
};

const addTransaction = async (userId, body) => {
  return Transaction.create({ owner: userId, ...body });
};

const removeTransaction = async (transactionId, userId) => {
  return Transaction.findOneAndDelete({ _id: transactionId, owner: userId });
};

const getTransactionWithId = async (transactionId, userId) => {
  return Transaction.findOne({ _id: transactionId, owner: userId });
};

const update = async (transactionId, userId, body) => {
  return Transaction.findOneAndUpdate(
    { _id: transactionId, owner: userId },
    { ...body },
    { new: true }
  );
};

module.exports = {
  getTransactions,
  addTransaction,
  removeTransaction,
  getTransactionWithId,
  update,
};
