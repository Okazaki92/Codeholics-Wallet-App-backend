const express = require("express");
const router = express.Router();
const { signup } = require("../../controller/userController");
const { auth } = require("../../middlewares/auth");

router.post("/signup", signup);

module.exports = router;
