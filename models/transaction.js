const mongoose = require("mongoose");
const { Schema } = mongoose;

const transaction = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
      required: [true, "Set Date"],
    },
    income: {
      type: Boolean,
      default: false,
      required: true, 
    },
    category: {
      type: String, 
    },
    comment: {
      type: String,
    },
    sum: {
      type: Number,
      required: [true, "Set value for Sum"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Transaction = mongoose.model("transaction", transaction, "transactions");

module.exports = {
  Transaction,
};
