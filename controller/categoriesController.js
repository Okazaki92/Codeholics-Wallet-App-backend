const { getAll, create } = require("../services/categoriesServices");

const getCategories = async (req, res, next) => {
  const categories = await getAll();
  res.json({
    status: "success",
    code: 200,
    data: {
      categories,
    },
  });
};

const createCategory = async (req, res, next) => {
  // walidacja danych
  const { body } = req;
  const newCategory = await create(body);
  res.json({
    status: "created",
    code: 201,
    data: {
      newCategory,
    },
  });
};

module.exports = {
  getCategories,
  createCategory,
};
