const { Transaction } = require("../models/transaction");

const configureEndDate = (month, year) => {
  if (month === "12") {
    return new Date(`${parseInt(year) + 1}-01-01T00:00`);
  } else {
    return new Date(
      `${year}-${prepareMonth((parseInt(month) + 1).toString())}-01T00:00`
    );
  }
};

const prepareMonth = (month) => {
  if (parseInt(month.length) === 2) {
    return month;
  } else return `0${month}`;
};
const getCategoriesUser = async (month, year, userId) => {
  const startDate = new Date(
    `${year}-${prepareMonth(month)}-01T00:00`
  ).toISOString();

  const endDate = configureEndDate(month, year).toISOString();

  return Transaction.find({
    owner: userId,
    date: { $gte: startDate, $lt: endDate },
  });
};

module.exports = {
  getCategoriesUser,
};
