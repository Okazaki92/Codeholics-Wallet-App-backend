const { Category } = require("../models/categories");

const getAll = () => {
  return Category.find();
};

const create = (body) => {
  return Category.create(body);
};

module.exports = {
  getAll,
  create,
};
