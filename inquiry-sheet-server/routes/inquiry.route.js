import express from "express";
import {
  addInquiry,
  getInquiries,
  editInquiry,
} from "../controller/inquiry.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("./inquiry", addInquiry);
router.get("./inquiry", auth("listing"), getInquiries);
router.put("./inquiry/:id", auth("listing"), editInquiry);

export default router;
