import { errorHandler } from "../utils/error.js";
import Inquiry from "../models/inquiry.model.js";

const addInquiry = async (req, res, next) => {
  //get the data from the body
  const {
    fullName,
    phoneNumber,
    city,
    project,
    type,
    bedrooms,
    vacant,
    budget,
    views,
    comments,
  } = req.body;

  //validate the required fields
  if (!fullName || !phoneNumber || !city || !bedrooms || !budget) {
    return next(errorHandler(400, "Please fill in all the required fields"));
  }

  //create a new inquiry
  const inquiry = new Inquiry({
    fullName,
    phoneNumber,
    city,
    project,
    type,
    bedrooms,
    vacant,
    budget,
    views,
    comments,
  });

  //save the inquiry
  try {
    await inquiry.save();
    res.status(201).json({ message: "Inquiry added successfully" });
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};

const getInquiries = async (req, res, next) => {
  //get all inquiries
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json(inquiries);
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};

const editInquiry = async (req, res, next) => {
  //get the inquiry id from the request parameters
  const { id } = req.params;

  //get the updated inquiry data from the request body
  const { refNum, listingAgentName, feedback } = req.body;

  //validate the required fields
  if (!refNum || !listingAgentName) {
    return next(errorHandler(400, "Please fill in all the required fields"));
  }

  //find the inquiry by id and update its data
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      {
        refNum,
        listingAgentName,
        feedback,
      },
      { new: true }
    );

    if (!inquiry) {
      return next(errorHandler(404, "Inquiry not found"));
    }

    res.status(200).json({ message: "Inquiry updated successfully" });
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};

export { addInquiry, getInquiries, editInquiry };
