const { getAll, create } = require("../services/categoriesServices");
const { handle200 } = require("../utils/handleErrors");

const getCategories = async (req, res, next) => {
  const categories = await getAll();
  handle200(res, "", categories);
};

module.exports = {
  getCategories,
};
