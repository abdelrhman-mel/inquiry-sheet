//inquiry model
import mongoose from "mongoose";
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
    project: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    bedrooms: {
      type: String,
      required: true,
    },
    floor: {
      type: String,
      required: false,
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
    refNum: {
      type: String,
      required: false,
    },
    listingAgentName: {
      type: String,
      required: false,
    },
    feedback: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);
export default Inquiry;
