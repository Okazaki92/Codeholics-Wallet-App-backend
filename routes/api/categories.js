const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares");
const categoriesController = require("../../controller/categoriesController");

router
  .get("/", categoriesController.getCategories)
  .post("/", categoriesController.createCategory);

module.exports = router;
