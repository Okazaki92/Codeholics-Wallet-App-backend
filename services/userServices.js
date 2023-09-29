const { User } = require("../models/user");

const addUser = ({ email, password, name, verificationToken, wallet }) => {
  try {
    return User.create({
      email,
      password,
      name,
      verificationToken,
      wallet,
    });
  } catch (err) {
    return false;
  }
};

const getUserByEmail = ({ email }) => {
  try {
    return User.findOne({ email });
  } catch (error) {
    return false;
  }
};

const getUserById = (_id) => {
  try {
    return User.findById(_id);
  } catch (error) {
    return false;
  }
};

const updateUser = (id, body) => {
  try {
    return User.findByIdAndUpdate(id, body, { new: true });
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
