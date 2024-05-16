import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
//port
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

//connect to db
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

//routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

//listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
