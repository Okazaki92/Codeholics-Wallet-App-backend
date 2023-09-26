const {  getTransactionsByDate } = require("../services/categoriesServices");

const getCategories = async (req, res, next) => {
  const userId = req.user.id;
  const { month, year } = req.query;

  const transactionsByDate = await getTransactionsByDate(month, year, userId);

  const arrCategory = [];
  let expenses = 0;
  let income = 0;
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

  return res.status(200).json({
    status: "ok",
    code: 200,
    message: "testy",
    data: { arrCategory, expenses, income },
  });
};

module.exports = {
  getCategories,
};
