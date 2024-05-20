const { errorHandler } = require("../utils/error");

const addInquiry = async (req, res) => {
  //get the data from the body
  const {
    fullName,
    phoneNumber,
    city,
    area,
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
    area,
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
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getInquiries = async (req, res) => {
  //get all inquiries
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json(inquiries);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const editInquiry = async (req, res) => {
  //get the inquiry id from the request parameters
  const { id } = req.params;

  //get the updated inquiry data from the request body
  const {
    fullName,
    phoneNumber,
    city,
    area,
    project,
    type,
    bedrooms,
    vacant,
    budget,
    views,
    comments,
    refNum,
    listingAgentName,
    feedBack,
  } = req.body;

  //validate the required fields
  if (!fullName || !phoneNumber || !city || !bedrooms || !budget) {
    return res
      .status(400)
      .json({ error: "Please fill in all the required fields" });
  }

  //find the inquiry by id and update its data
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      {
        fullName,
        phoneNumber,
        city,
        area,
        project,
        type,
        bedrooms,
        vacant,
        budget,
        views,
        comments,
        refNum,
        listingAgentName,
        feedBack,
      },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found" });
    }

    res.status(200).json({ message: "Inquiry updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { addInquiry, getInquiries, editInquiry };
