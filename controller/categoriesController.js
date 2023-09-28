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

module.exports = {
  getCategories,
};
