// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

const auth = (role) => async (req, res, next) => {
  const token =
    req.header("Authorization").replace("Bearer ", "") ||
    req.cookies.access_token;

  if (!token) {
    return res.status(401).send({ error: "Please authenticate." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    if (role && user.role !== role) {
      return next(errorHandler(403, "Unauthorized"));
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default auth;
