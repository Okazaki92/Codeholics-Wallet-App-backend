const mongoose = require("mongoose");
const { Schema } = mongoose;

const transaction = new Schema(
  {
    Date: {
      type: Date,
      default: Date.now,
      required: [true, "Set Date"],
    },
    Type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Choose type transaction"],
    },
    Category: {
      type: String, // TODO Własne czy narzucone z enum
    },
    Comment: {
      type: String,
    },
    Sum: {
      type: Number,
      required: [true, "Set value for Sum"],
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    // },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Transaction = mongoose.model("transaction", transaction);

module.exports = {
  Transaction,
};
