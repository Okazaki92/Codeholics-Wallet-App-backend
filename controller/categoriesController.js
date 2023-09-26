const { getCategoriesUser } = require("../services/categoriesServices");

const getCategories = async (req, res, next) => {
  const userId = req.user.id;
  const { month, year } = req.query;

  const categories = await getCategoriesUser(month, year, userId);
  console.log("Wszystkie transakcje uzytkownika danego miesąca:", categories);
  const arrCategory = [];
  for (const category of categories) {
    const Cat = category.category;
    const Sum = category.sum;
    if (!arrCategory.some((ob) => Cat in ob)) {
      arrCategory.push({ [Cat]: Sum });
    } else {
      const edit = arrCategory.find((ob) => Cat in ob);
      edit[Cat] += Sum;
    }
  }
  console.log(`Tablica kategori`, arrCategory);
  return res.status(200).json({
    status: "ok",
    code: 200,
    message: "testy",
    data: arrCategory,
  });
};

module.exports = {
  getCategories,
};
