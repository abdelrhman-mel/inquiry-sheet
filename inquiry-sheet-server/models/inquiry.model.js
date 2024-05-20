//inquiry model
const mongoose = require("mongoose");
const inquirySchema = new mongoose.Schema(
  {
    fullName: {
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
    city: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: false,
    },
    project: {
      type: String,
      required: false,
    },
    type: {
      type: String,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    vacant: {
      type: Boolean,
      required: false,
    },
    budget: {
      type: Number,
      required: true,
    },
    views: {
      type: String,
      required: false,
    },
    comments: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);
module.exports = Inquiry;
