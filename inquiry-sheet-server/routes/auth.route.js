import express from "express";
import { signIn, signUp } from "../controller/auth.controller.js";

const router = express.Router();

//signup route
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", (req, res) => {
  res.clearCookie("access_token").json({ message: "Signout successful" });
});

export default router;
