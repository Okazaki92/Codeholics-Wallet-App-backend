const { getTransactionsByDate } = require("../services/statisticsServices");
const { handle404, handle200 } = require("../utils/handleErrors");

const getStatistics = async (req, res, next) => {
  const userId = req.user.id;
  const { month, year } = req.query;

  const transactionsByDate = await getTransactionsByDate(month, year, userId);
  if (!transactionsByDate) {
    return handle404(res, "Not Found");
  }
  const arrCategory = [];
  let expenses = 0;
  let income = 0;
  let balance = 0;
  for (const transaction of transactionsByDate) {
    const Cat = transaction.category;
    const Sum = transaction.sum;
    if (!transaction.income) {
      if (!arrCategory.some((ob) => Cat in ob)) {
        arrCategory.push({ [Cat]: Sum });
        expenses += Sum;
      } else {
        const edit = arrCategory.find((ob) => Cat in ob);
        edit[Cat] += Sum;
        expenses += Sum;
      }
    } else {
      income += Sum;
    }
  }
  balance = income - expenses;
  handle200(res, "Success! Statistics received.", {
    arrCategory,
    expenses,
    income,
    balance,
  });
};

module.exports = {
  getStatistics,
};
