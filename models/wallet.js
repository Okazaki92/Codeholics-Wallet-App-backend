const mongoose = require("mongoose");
const { Schema } = mongoose;

const wallet = new Schema({
  balance: {
    type: Number,
    require: true,
  },

  transactions: {
    type: Schema.Types.ObjectId,
    ref: "transaction",
  },
});

const Wallet = mongoose.model("wallet", wallet);

module.exports = { Wallet };
