const { getCategoriesUser } = require("../services/categoriesServices");

const getCategories = async (req, res, next) => {
  const userId = req.user.id;
  const { month, year } = req.query;

  const categories = await getCategoriesUser(month, year, userId);
    console.log("category", categories);
    return res.status(200).json({
      status: "ok",
      code: 200,
      message: "testy",
      data: { categories },
    });
};

module.exports = {
  getCategories,
};
