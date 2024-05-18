import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
//import inquiryRoutes from "./routes/inquiry.route.js";

dotenv.config();
const app = express();
//port
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

//routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", authRoutes);
//app.use("/api/inquiry", inquiryRoutes);

//listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
