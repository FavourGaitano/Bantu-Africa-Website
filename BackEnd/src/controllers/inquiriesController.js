import { v4 } from "uuid";
import {
  createInquiriesService,
  deleteInquiryService,
  getInquiriesByEmailService,
  getInquiriesByIdService,
  getInquiriesService,
  updateInquiryService,
} from "../services/inquiriesService.js";
import { inquiriesvalidator } from "../validators/inquiriesValidator.js";
import {
  checkIfValuesIsEmptyNullUndefined,
  sendBadRequest,
  sendCreated,
  sendDeleteSuccess,
  sendNotFound,
  sendServerError,
} from "../helper/helperFunctions.js";

export const createInquiry = async (req, res) => {
  const { Name, Email, Description } = req.body;
  const { error } = inquiriesvalidator(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    try {
      const InquiryId = v4();
      const Status = "Pending";
      const newInquiry = { InquiryId, Name, Email, Description, Status };
      const response = await createInquiriesService(newInquiry);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, "Inquiry created successfully");
      }
    } catch (error) {
      return error;
    }
  }
};

export const getInquiries = async (req, res) => {
  try {
    const data = await getInquiriesService();

    if (data.length === 0) {
      sendNotFound(res, "No inquiries found");
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    return error;
  }
};

export const getInquiriesByEmail = async (req, res) => {
  // console.log(req.params);
  const { email } = req.params;
  try {
    const data = await getInquiriesByEmailService(email);
    if (data.length === 0) {
      sendNotFound(res, "No inquiries found");
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const getInquiriesById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await getInquiriesByIdService(id);
    if (data.length === 0) {
      sendNotFound(res, "Inquiry not found");
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const updateInquiry = async (req, res) => {
  const InquiryId = req.params.id;
  try {
    const inquiryToUpdate = await getInquiriesByIdService(InquiryId);
    if (inquiryToUpdate.length === 0) {
      sendNotFound(res, "Inquiry to update not found");
    } else {
      if (checkIfValuesIsEmptyNullUndefined) {
        const { Name, Email, Description, Status } = req.body;
        const updatedInquiry = { Name, Email, Description, Status };
        if (Name) {
          updatedInquiry.Name = Name;
        }
        if (Email) {
          updatedInquiry.Email == Email;
        }
        if (Description) {
          updatedInquiry.Description = Description;
        }
        if (Status) {
          updatedInquiry.Status = Status;
        }
        const response = await updateInquiryService(InquiryId, updatedInquiry);
        console.log("res:", response);
        if (response.rowsAffected == 1) {
          sendCreated(res, "inquiry updated successfully");
        } else {
          sendServerError(res, "Failed to update");
        }
      } else {
        sendBadRequest(res, "Please provide a complete field");
      }
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const deleteInquiry = async (req, res) => {
  const InquiryId = req.params.id;
  try {
    const inquiryToDelete = await getInquiriesByIdService(InquiryId);
    if (!inquiryToDelete) {
      sendNotFound(res, "Inquiry to delete not found");
    } else {
      await deleteInquiryService(InquiryId);
      sendDeleteSuccess(res, "Inquiry deleted successfully");
    }
  } catch (error) {
    sendServerError(res, error);
  }
};
