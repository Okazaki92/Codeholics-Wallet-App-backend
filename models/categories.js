const mongoose = require("mongoose");
const { Schema } = mongoose;

const category = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      default: "expense",
    },
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
