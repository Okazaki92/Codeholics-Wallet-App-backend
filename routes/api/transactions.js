const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares/auth");
const transactionsController = require("../../controller/transactionsController");

router.get("/transactions", auth, transactionsController.get); // TODO add transactionsController.get
router.get("/transactions", auth,); //TODO add transactionsController.getBy(category)
router.get("/transactions", auth,); // TODO add transactionsController.getBy(montch/year)
router.post("/transactions", auth,); // TODO add transactionsController.create

module.exports = router;