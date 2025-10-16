const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Malformed token" });
    }

    const decoded = jwt.verify(token, JWT_SECRET); // throws if invalid or expired
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = { authenticateToken };
