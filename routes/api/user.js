const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  verifyUserToken,
  currentUser,
  sendVerifyToken,
  register,
} = require("../../controller/userController");
const { auth } = require("../../middlewares/");

router.post("/register", register);
router.post("/login", login);
router.post("/verify", sendVerifyToken);
router.get("/logout", auth, logout);
router.get("/verify/:verificationToken", verifyUserToken);
router.get("/current", auth, currentUser);

module.exports = router;
