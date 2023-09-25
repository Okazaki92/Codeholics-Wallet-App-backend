const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./config/passport-config");

const app = express();

const userRouter = require("./routes/api/user");
const transactionsRouter = require("./routes/api/transactions");
const categoriesRouter = require("./routes/api/categories");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", userRouter);

app.use("/api/transactions", transactionsRouter); 

app.use("/api/categories",  categoriesRouter) //TODO add categoriesRouter

app.get("/", (req, res) => res.json({ version: "1.0" }));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
