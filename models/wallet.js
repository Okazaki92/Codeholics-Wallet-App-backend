const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Transaction } = require("./transaction");

const wallet = new Schema({
  balance: {
    type: Number,
    require: true,
  },

  // transactions: [Transaction],
});

const Wallet = mongoose.model("wallet", wallet);

module.exports = { Wallet };
