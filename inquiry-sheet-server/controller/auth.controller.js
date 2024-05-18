import User from "../models/user.model.js";
import brycpt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  //check the incoming data
  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }
  // check if user already exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return next(errorHandler(400, "User already exists"));
  }
  const hashedPassword = await brycpt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  try {
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //check the incoming data
    if (!email || !password) {
      return next(errorHandler(404, "All fields are required"));
    }
    // check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(errorHandler(401, "Invalid credentials"));
    }
    //check password
    const isMatch = await brycpt.compare(password, user.password);
    if (!isMatch) {
      return next(errorHandler(401, "Invalid credentials"));
    }
    //generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //remove the password before sending the response
    const { password: pass, ...rest } = user._doc;
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({ rest });
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn };
