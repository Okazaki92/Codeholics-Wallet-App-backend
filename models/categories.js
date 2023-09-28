const mongoose = require("mongoose");
const { Schema } = mongoose;

const category = new Schema(
  {
    data: [
      {
        type: {
          type: String,
          default: "expense",
          enum: ["expense"],
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Category = mongoose.model("category", category, "category");

module.exports = {
  Category,
};
