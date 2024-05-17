const jwt = require("jsonwebtoken");

//middleware for token verification

function verifyToken(req, res, next) {
  const token = req.headers.authorization || req.cookies.access_token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token." });
  }
}

module.exports = verifyToken;
