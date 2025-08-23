require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createUser = async ({ name, email, password, companyName }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already registered");
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    companyName,
  });

  const secretKey = process.env.JWT_SECRET;

  const token = jwt.sign(
    { userId: newUser._id, email: newUser.email },
    secretKey,
    { expiresIn: "7d" }
  );

  return { user: newUser, token };
};

const userLogin = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not registered!");

  const isMatchPassword = await bcrypt.compare(password, user.password);

  if (!isMatchPassword) throw new Error("password is incorrect!");
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
    expiresIn: "7d",
  });

  return { user, token };
};

module.exports = { createUser, userLogin };
