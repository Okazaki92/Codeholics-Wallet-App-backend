const { Wallet } = require("../models/wallet");

const createWallet = (body) => {
  try {
    return Wallet.create(body);
  } catch (err) {
    return false;
  }
};

const getWalletById = ({ _id }) => {
  try {
    return Wallet.findById(_id);
  } catch (err) {
    return false;
  }
};

const updateWallet = ({ _id, body }) => {
  try {
    return Wallet.findByIdAndUpdate(_id, body, { new: true });
  } catch (err) {
    return false;
  }
};

module.exports = {
  createWallet,
  getWalletById,
  updateWallet,
};
