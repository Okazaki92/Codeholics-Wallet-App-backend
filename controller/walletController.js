const { updateWallet, getWalletById } = require("../services/walletServices");

const updateWalletBalance = async (
  walletId,
  transactionType,
  transactionSum
) => {
  const currentWallet = await getWalletById(walletId);
  const balance = currentWallet.balance;
  let newBalance;
  if (!transactionType) {
    newBalance = balance - transactionSum;
  } else {
    newBalance = balance + transactionSum;
  }

  return await updateWallet(walletId, { balance: newBalance });
};

module.exports = {
  updateWalletBalance,
};
