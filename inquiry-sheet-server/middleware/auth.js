// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

const auth = (role) => async (req, res, next) => {
  const token =
    req.headers.cookie && req.headers.cookie.split("=")[0] === "access_token"
      ? req.headers.cookie.split("=")[1]
      : null;
  console.log(token);

  if (!token) {
    return res.status(401).send({ error: "Please authenticate." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findOne({
      _id: decoded.id,
    });

    if (!user) {
      console.log("user not found");
      return next(errorHandler(404, "User not found"));
    }

    if (role && user.role !== role) {
      console.log("unauthorized");
      return next(errorHandler(403, "Unauthorized"));
    }
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default auth;
