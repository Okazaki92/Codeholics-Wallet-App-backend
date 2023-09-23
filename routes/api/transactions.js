const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares/");
const transactionsController = require("../../controller/transactionsController");

router
  .get("/", auth, transactionsController.getAllTransactions)
  .post("/", auth, transactionsController.createTransaction);
router
  .get("/:transactionId", transactionsController.getTransactionById) // TODO add auth because auth off for tests endpoints
  .delete("/:transactionId", transactionsController.deleteTransaction); // TODO add auth because auth off for tests endpoints
// .patch("/:transactionId",)
module.exports = router;
