const { Transaction } = require("../models/transaction");

const getTransactions = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 20;
  const startIndex = (page - 1) * limit;

  return Transaction.find().skip(startIndex).limit(limit);
};

const addTransaction = async (body) => {
  return Transaction.create(body);
};

const removeTransaction = async (transactionId) => {
  return Transaction.findOneAndDelete({ _id: transactionId });
};

const getTransactionWithId = async (query, transactionId) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 20;
  const startIndex = (page - 1) * limit;

  return Transaction.findOne({ _id: transactionId })
    .skip(startIndex)
    .limit(limit);
};

module.exports = {
  getTransactions,
  addTransaction,
  removeTransaction,
  getTransactionWithId,
};
