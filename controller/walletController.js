const { updateWallet, getWalletById } = require("../services/walletServices");

const updateWalletBalance = async (
  walletId,
  transactionType,
  transactionSum
) => {
  const currentWallet = await getWalletById(walletId);
  console.log(currentWallet.balance);
  const balance = currentWallet.balance;
  let newBalance;
  if (transactionType === "expense") {
    newBalance = balance - transactionSum;
  } else {
    newBalance = balance + transactionSum;
  }

  await updateWallet(walletId, { balance: newBalance });
  console.log(newBalance);
  return newBalance;
};

module.exports = {
  updateWalletBalance,
};
