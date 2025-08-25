const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateToken = async (req, res, next) => {


  const token = req.header("Authorization")?.split(" ")[1];


  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id); // Attach user to request


    next();
  } catch (err) {

    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authenticateToken;
