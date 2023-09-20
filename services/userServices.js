const { User } = require("../models/user");

const addUser = ({ email, password, firstName, verificationToken }) => {
  try {
    return User.create({
      email,
      password,
      firstName,
      verificationToken,
    });
  } catch (err) {
    return false;
  }
};

module.exports = { addUser };
