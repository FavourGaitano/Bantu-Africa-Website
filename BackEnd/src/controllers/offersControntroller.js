import { v4 } from "uuid";

import {
  checkIfValuesIsEmptyNullUndefined,
  sendBadRequest,
  sendCreated,
  sendDeleteSuccess,
  sendNotFound,
  sendServerError,
} from "../helper/helperFunctions.js";

export const createOfferController = async (req, res) => {
  const { OfferImageUrl, Description } = req.body;
  const { error } = inquiriesvalidator(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    try {
      const InquiryId = v4();
      const Status = "Pending";
      const newInquiry = { InquiryId, Email, Description, Status };
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
    if (data.length == 0) {
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
    if (!data) {
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
    if (!data) {
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
    if (!inquiryToUpdate) {
      sendNotFound(res, "Inquiry to update not found");
    } else {
      if (checkIfValuesIsEmptyNullUndefined) {
        const { Email, Description, Status } = req.body;
        const updatedInquiry = { Email, Description, Status };
        if (Email) {
          updateInquiry.Email == Email;
        }
        if (Description) {
          updatedInquiry.Description = Description;
        }
        if (Status) {
          updatedInquiry.Status = Status;
        }
        await updateInquiryService(InquiryId, updatedInquiry);
        sendCreated(res, "inquiry updated successfully");
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
