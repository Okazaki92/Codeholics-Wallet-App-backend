const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./config/passport-config");
const app = express();

const swaggerDocument = require("./swagger.json");
const userRouter = require("./routes/api/user");
const transactionsRouter = require("./routes/api/transactions");
const statisticsRouter = require("./routes/api/statistics");
const categoriesRouter = require("./routes/api/categories");
const { handle404, handle500 } = require("./utils/handleErrors");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
  
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));



app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCssUrl: CSS_URL })
);
app.use("/api/users", userRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/statistics", statisticsRouter);
app.use("/api/categories", categoriesRouter);

app.get("/", (req, res) => res.json({ version: "1.0" }));

app.use((req, res) => {
  handle404(res, "Not Found");
});
app.use((err, req, res, next) => {
  console.log("err:", err);
  handle500(res, err.message);
});

module.exports = app;
