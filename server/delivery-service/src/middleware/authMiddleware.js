const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

//.env should be included with JWT_SECRECT 
const SECRET_KEY = JWT_SECRET;

//Auth middleware to check if a user is authenticated properly
function authenticate(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Access denied. Malformed token." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: `Invalid token: ${err.message}` });
    }
    req.user = decoded;
    next();
  });
}

// Role-based middleware
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    console.log(req.user);
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}

module.exports = {
  authenticate,
  authorizeRoles,
};
