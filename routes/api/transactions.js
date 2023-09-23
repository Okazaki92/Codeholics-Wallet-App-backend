const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares/auth");
const transactionsController = require("../../controller/transactionsController");

router
  .get("/", transactionsController.getAllTransactions) // TODO add auth because auth off for tests endpoints
  .post("/", transactionsController.createTransaction); // TODO add auth because auth off for tests endpoints
router
  .get("/:transactionId", transactionsController.getTransactionById)
  .delete("/:transactionId", transactionsController.deleteTransaction);

module.exports = router;
