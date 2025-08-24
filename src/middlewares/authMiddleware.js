require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "");
    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization failed" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(401).json({ message: "Invalid token" });
    // add user to req body
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;
