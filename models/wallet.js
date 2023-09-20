const mongoose = require("mongoose");
const { Schema } = mongoose;

const wallet = new Schema({
  balance: {
    type: String,
    require: true,
  },

  transaction: {},

  category: {},

  owner: {},
});

const Wallet = mongoose.model("wallet", wallet);

module.exports = { Wallet };
