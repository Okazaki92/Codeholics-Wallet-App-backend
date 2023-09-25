const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares/");
const categoriesController = require("../../controller/categoriesController");

router.get("/", auth, categoriesController.getCategories);

module.exports = router;
