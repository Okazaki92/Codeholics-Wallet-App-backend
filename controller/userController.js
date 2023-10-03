const bcrypt = require("bcrypt");
require("dotenv").config();
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");

const { validation } = require("../middlewares");
const {
  userSchema,
  loginSchema,
  registerSchema,
} = require("../schemas/userSchema");
const { verificationEmail } = require("../utils/sendVerificationEmail");
const {
  addUser,
  getUserByEmail,
  getUserById,
  verifyToken,
  updateUser,
} = require("../services/userServices");
const {
  handle409,
  handle201,
  handle401,
  handle200,
  handle204,
  handle404,
  handle400,
} = require("../utils/handleErrors");

const secret = process.env.SECRET;

const register = async (req, res, next) => {
  try {
    if (validation(req, res, registerSchema)) {
      return;
    }

    const { email, password, name } = req.body;

    const checkEmail = await getUserByEmail({ email });

    if (checkEmail) {
      return handle409(res, "Email is already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await addUser({
      email,
      password: hashPassword,
      name,
      verificationToken: nanoid(),
      token: null,
    });
    verificationEmail(newUser.email, newUser.verificationToken);

    handle201(res, "Registration successful", {
      token: newUser.token,
      email: newUser.email,
      name: newUser.name,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    if (validation(req, res, loginSchema)) {
      return;
    }

    const { email, password } = req.body;

    const user = await getUserByEmail({ email });

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!user || !passwordCompare) {
      return handle401(res, "Incorrect login or password");
    }

    if (!user.verify) {
      return handle401(res, "email is not verifed");
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    const update = await updateUser(user._id, { token });
    console.log("uds", user);
    handle200(res, `Welcome ${user.name}`, {
      token: update.token,
      user: {
        email: user.email,
        id: user._id,
        balance: user.balance,
        name: user.name,
      },
    });
  } catch (error) {
    console.log("uuuuuu");
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await updateUser(_id, { token: null });
    handle204(res);
  } catch (error) {
    next(error);
  }
};

const verifyUserToken = async (req, res, next) => {
  try {
    const verificationToken = req.params;
    const user = await verifyToken(verificationToken, {
      verify: true,
      verificationToken: null,
    });
    if (!user) {
      return handle404(res, "User not found", user);
    }
    res.redirect("https://codeholics-wallet-app.netlify.app/login");
    handle200(res, "Verification successful");
  } catch (error) {
    next(error);
  }
};

const sendVerifyToken = async (req, res, next) => {
  try {
    // validation(userSchema);

    const { email } = req.body;

    const user = await getUserByEmail({ email });
    if (!user) {
      return handle404(res, "Not Found");
    }
    if (user.verify) {
      return handle400(res, "Verification has already been passed");
    }
    const newVerifyToken = user.verificationToken;
    await verificationEmail(email, newVerifyToken);
    handle200(res, "Verification email sent");
  } catch (error) {
    next(err);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const _id = req.user;

    const user = await getUserById(_id);
    if (!user) {
      return handle404(res, "Not Found");
    }

    const { email, name, balance, id, token } = user;
    handle201(res, "", {
      id,
      email,
      name,
      balance,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const updateBalance = async (
  userId,
  balance,
  transactionType,
  transactionSum
) => {
  let newBalance;
  if (!transactionType) {
    newBalance = balance - transactionSum;
  } else {
    newBalance = balance + transactionSum;
  }

  return await updateUser(userId, { balance: newBalance });
};

const updateBalanceAfterDelete = async (
  userId,
  balance,
  transactionType,
  transactionSum
) => {
  let newBalance;
  if (transactionType) {
    newBalance = balance - transactionSum;
  } else {
    newBalance = balance + transactionSum;
  }

  return await updateUser(userId, { balance: newBalance });
};

const updateBalanceAfterChange = async (
  userId,
  balance,
  transactionType,
  oldTransactionSum,
  transactionSum
) => {
  let newBalance;
  if (!transactionType) {
    newBalance = balance + oldTransactionSum - transactionSum;
  } else {
    newBalance = balance + oldTransactionSum - transactionSum;
  }

  return await updateUser(userId, { balance: newBalance });
};

module.exports = {
  register,
  login,
  logout,
  verifyUserToken,
  sendVerifyToken,
  currentUser,
  updateBalance,
  updateBalanceAfterChange,
  updateBalanceAfterDelete,
};
