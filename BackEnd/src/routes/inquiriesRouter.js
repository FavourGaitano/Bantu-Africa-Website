import { Router } from "express";
import {
  createInquiry,
  deleteInquiry,
  getInquiries,
  getInquiriesByEmail,
  getInquiriesById,
  updateInquiry,
} from "../controllers/inquiriesController.js";

const inquiriesRouter = Router();

inquiriesRouter.post("/inquiry", createInquiry);
inquiriesRouter.get("/inquiries", getInquiries);
inquiriesRouter.get("/:email/find/inquiries/", getInquiriesByEmail);
inquiriesRouter.get("/inquiries/find/:id", getInquiriesById);
inquiriesRouter.put("/inquiry/update/:id", updateInquiry);
inquiriesRouter.delete("/inquiry/delete/:id", deleteInquiry);

export default inquiriesRouter;
