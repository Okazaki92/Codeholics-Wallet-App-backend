const mongoose = require("mongoose");
const { Schema } = mongoose;

const wallet = new Schema({
  balance: {
    type: String,
    require: true,
  },

  transaction: {
    type: Schema.Types.ObjectId,
    ref: "Transaction",
  },

  category: {},
});

const Wallet = mongoose.model("wallet", wallet);

module.exports = { Wallet };
