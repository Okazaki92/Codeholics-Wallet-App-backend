const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares/");
const transactionsController = require("../../controller/transactionsController");

router
  .get("/", auth, transactionsController.getAllTransactions)
  .post("/", auth, transactionsController.createTransaction);
router
  .get("/:transactionId", auth, transactionsController.getTransactionById)
  .delete("/:transactionId", auth, transactionsController.deleteTransaction)
  .patch("/:transactionId", auth, transactionsController.updateTransaction);

module.exports = router;
