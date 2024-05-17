import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: "First name is required",
    },
    lastName: {
      type: String,
      required: "Last name is required",
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: "Phone number is required",
    },
    password: {
      type: String,
      required: "Password is required",
    },
    avatar: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?t=st=1715927475~exp=1715931075~hmac=265d0cad55b5a7242eb5d1682f729a99f2789a74d197f37ed0b7bb2bef1e9374&w=740",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
