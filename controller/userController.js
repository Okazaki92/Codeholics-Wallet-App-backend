const bcrypt = require("bcrypt");
require("dotenv").config();
const { nanoid } = require("nanoid");

const { userSchema } = require("../schemas/userSchema");
const { addUser } = require("../services/userServices");

const signup = async (req, res, next) => {
  const validators = userSchema.validate(req.body);
  if (validators.error?.message) {
    return res.status(400).json({ message: validators.error.message });
  }
  const { email, password, firstName } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await addUser({
    email,
    password: hashPassword,
    firstName,
    verificationToken: nanoid(),
  });
  res.status(201).json({
    message: "Registration successful",
    user: {
      email: newUser.email,
      firstName: newUser.firstName,
    },
  });
};

module.exports = { signup };
