const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  verifyUserToken,
  currentUser,
  sendVerifyToken,
} = require("../../controller/userController");
const { auth } = require("../../middlewares/");

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify", sendVerifyToken);
router.get("/logout", auth, logout);
router.get("/verify/:verificationToken", verifyUserToken);
router.get("/current", currentUser);

module.exports = router;
