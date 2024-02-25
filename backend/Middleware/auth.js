const jwt = require("jsonwebtoken");
const User = require('../../Models/User');

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Please login to access this resource",
    });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Invalid or expired token. Please login again.",
    });
  }
};
