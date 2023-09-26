const bcrypt = require("bcrypt");
require("dotenv").config();
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");

const { validation } = require("../middlewares");
const { userSchema } = require("../schemas/userSchema");
const { verificationEmail } = require("../utils/sendVerificationEmail");
const {
  addUser,
  getUserByEmail,
  getUserById,
  verifyToken,
  updateUser,
} = require("../services/userServices");

const secret = process.env.SECRET;

const register = async (req, res, next) => {
  try {
    validation(userSchema);

    const { email, password, firstName } = req.body;

    const checkEmail = await getUserByEmail({ email });

    if (checkEmail) {
      return res.status(409).json({
        message: "Email is already in use",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await addUser({
      email,
      password: hashPassword,
      firstName,
      verificationToken: nanoid(),
      balance,
    });
    verificationEmail(newUser.email, newUser.verificationToken);
    res.status(201).json({
      status: "success",
      message: "Registration successful",
      data: {
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    validation(userSchema);

    const { email, password } = req.body;

    const user = await getUserByEmail({ email });

    const passwordCompare = bcrypt.compare(password, user.password);

    if (!user || !passwordCompare) {
      return res.status(401).json({
        message: "Incorrect login or password",
      });
    }

    if (!user.verify) {
      return res.status(401).json({
        message: "email is not verifed",
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    const update = await updateUser(user.id, token);
    res.status(200).json({
      data: {
        token: update.token,
        user: {
          email: user.email,
          id: user.id,
          balance: user.balance,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await updateUser(_id, { token: null });
    res.status(204).json({});
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
      return res.status(404).json({
        message: "User not found",
        user,
      });
    }
    res.status(200).json({
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

const sendVerifyToken = async (req, res, next) => {
  try {
    validation(userSchema);

    const { email } = req.body;

    const user = await getUserByEmail({ email });
    if (!user) {
      return res.status(400).json({ message: "No user" });
    }
    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }
    const newVerifyToken = user.verificationToken;
    await verificationEmail(email, newVerifyToken);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification email sent",
    });
  } catch (error) {
    next(err);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const _id = req.user;

    const user = await getUserById(_id);
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const { email, name } = user;
    res.status(201).json({
      data: {
        user: {
          id: _id,
          email,
          name,
        },
      },
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
    newBalance = balance - oldTransactionSum + transactionSum;
  }

  return await updateWallet(userId, { balance: newBalance });
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
