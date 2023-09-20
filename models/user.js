const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Wallet } = require("./wallet");

const user = new Schema({
  firstName: {
    type: String,
    require: [true, "First Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },


  token: {
    type: String,
    default: null,
  },

  verify: {
    type: Boolean,
    default: false,
  },

  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

const User = mongoose.model("user", user);

module.exports = {
  User,
};
