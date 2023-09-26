const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares");
const statisticsController = require("../../controller/statisticsController");

router.get("/", auth, statisticsController.getStatistics);

module.exports = router;
