const { User } = require("../models/user");

const addUser = ({ email, password, firstName, verificationToken, wallet }) => {
  try {
    return User.create({
      email,
      password,
      firstName,
      verificationToken,
      wallet,
    });
  } catch (err) {
    return false;
  }
};

const getUserByEmail = ({ email }) => {
  try {
    return User.findOne(email);
  } catch (error) {
    return false;
  }
};

const getUserById = ({ _id }) => {
  try {
    return User.findById(_id).populate("wallet");
  } catch (error) {
    return false;
  }
};

const updateUser = ({ _id, body }) => {
  try {
    return User.findByIdAndUpdate({ _id }, body, { new: true });
  } catch (err) {
    return false;
  }
};

const verifyToken = ({ verificationToken }) => {
  try {
    return User.findOneAndUpdate(
      { verificationToken },
      { verify: true, verificationToken: null },
      { new: true }
    );
  } catch (err) {
    return false;
  }
};

module.exports = {
  addUser,
  getUserByEmail,
  getUserById,
  updateUser,
  verifyToken,
};
