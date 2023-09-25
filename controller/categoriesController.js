const { getCategoriesUser } = require("../services/categoriesServices");

const getCategories = async (req, res, next) => {
  const userId = req.user.id;
  const { month, year } = req.query;

  const categories = await getCategoriesUser(month, year, userId);
    console.log("category", categories);
    const objectCat = [];
    for ( const category of categories) {
        // console.log("category", category.category);
        // console.log("sum", category.sum);
        const Cat = category.category;
        const Sum = category.sum;
        objectCat.push({  [Cat]: Sum })
        console.log('obj',objectCat);
    }

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
