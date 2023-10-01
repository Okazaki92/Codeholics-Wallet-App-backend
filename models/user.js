const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
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

  balance: {
    type: Number,
    default: 0,
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

const User = mongoose.model("user", user, "users");

module.exports = {
  User,
};
