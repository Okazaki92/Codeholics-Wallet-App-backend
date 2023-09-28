const { Category } = require("../models/categories");

const getAll = () => {
  return Category.find();
};

module.exports = {
  getAll,
};
