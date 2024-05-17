//inquiry model
const mongoose = require("mongoose");
const inquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    inquiry: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);
module.exports = Inquiry;
