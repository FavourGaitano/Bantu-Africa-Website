import { v4 } from 'uuid';
import {sendCreated, sendDeleteSuccess, sendNotFound, sendServerError,validationError} from '../helper/helperFunctions.js'
import { addOfferService, deleteOfferService, getOffersService, getSingleOfferService, updateOfferService } from "../services/offersService.js";
import { offerValidator, updateOfferValidator } from '../validators/offerValidator.js';

export const addOfferController = async (req, res) => {
  try {
    const { OfferImageUrl } = req.body;
    const { error } = offerValidator({ OfferImageUrl });
    if (error) {
      return validationError(res, error.message);
    }

    const OfferId = v4();
    const newOffer = { OfferId, OfferImageUrl };
    const response = await addOfferService(newOffer);

    if (response.message) {
      return sendServerError(res, response.message);
    } else {
      return sendCreated(res, "Offer created successfully");
    }
  } catch (error) {
    return sendServerError(res, error.message);
  }
};

export const getAllOffersController = async (req, res) => {
  try {
    const data = await getOffersService();
    console.log("data",data.recordset);
    if (!data.recordset || data.recordset.length === 0) {
      return sendNotFound(res, "No offers found");
    }
    return res.status(200).json(data.recordset);
  } catch (error) {
    return sendServerError(res, error.message);
  }
};

export const getOneOfferController = async (req, res) => {
  try {
    const { OfferId } = req.params;
    const data = await getSingleOfferService(OfferId);
    if (data.length !== 0) {
      return res.status(200).json(data[0]);
    } else {
      return sendNotFound(res, "Offer not found");
    }
  } catch (error) {
    return sendServerError(res, error.message);
  }
};

export const updateOfferController = async (req, res) => {
  try {
    const { OfferId } = req.params;
    const { OfferImageUrl } = req.body;
    const { error } = updateOfferValidator({ OfferImageUrl });
    if (error) {
      return validationError(res, error.message);
    }
    const offerToUpdate = await getSingleOfferService(OfferId);
    if (!offerToUpdate) {
      sendNotFound(res, "offer to update not found");
    } else {
    const response = await updateOfferService( { OfferId,OfferImageUrl });
    console.log("response",response);
   
      return res.status(200).json({ message: "Offer updated successfully" });
  }
  } catch (error) {
    return sendServerError(res, error.message);
  }
};

export const deleteOfferController = async (req, res) => {
  try {
    const { OfferId } = req.params;
    const response = await deleteOfferService(OfferId);
    if (response.rowsAffected === 1) {
      return sendDeleteSuccess(res, "Offer deleted successfully");
    } else {
      return sendNotFound(res, "Offer not found or not deleted");
    }
  } catch (error) {
    return sendServerError(res, error.message);
  }
};
