import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: "First name is required",
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: "Phone number is required",
    },
    password: {
      type: String,
      required: "Password is required",
    },
    role: {
      type: String,
      default: "broker",
      enum: ["admin", "listing", "broker"],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
