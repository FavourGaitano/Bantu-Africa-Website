import { poolRequest, closePool, sql } from "../utils/dbConnect.js";

export const getOffersService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Offers");
    return result.recordset;
  } catch (error) {
    console.error("Error fetching offers:", error);
    throw error;
  }
};

export const addOfferService = async (offer) => {
  try {
    const result = await poolRequest()
      .input("OfferId", sql.VarChar, offer.OfferId)
      .input("OfferImageUrl", sql.VarChar, offer.OfferImageUrl)
      .query(
        "INSERT INTO Offers (OfferId, OfferImageUrl) VALUES (@OfferId, @OfferImageUrl)"
      );
    return result;
  } catch (error) {
    console.error("Error adding offer:", error);
    throw error;
  }
};

export const getSingleOfferService = async (OfferId) => {
  try {
    const singleOffer = await poolRequest()
      .input("OfferId", sql.VarChar, OfferId)
      .query("SELECT * FROM Offers WHERE OfferId = @OfferId");
    return singleOffer;
  } catch (error) {
    console.error("Error fetching single offer:", error);
    throw error;
  }
};

export const updateOfferService = async (updateOffer) => {
  try {
    const result = await poolRequest()
      .input("OfferId", sql.VarChar, updateOffer.OfferId)
      .input("OfferImageUrl", sql.VarChar, updateOffer.OfferImageUrl)
      .query(
        "UPDATE Offers SET OfferImageUrl = @OfferImageUrl WHERE OfferId = @OfferId"
      );
    console.log("Updated offer:", result);
    return result;
  } catch (error) {
    console.error("Error updating offer:", error);
    throw error;
  }
};

export const deleteOfferService = async (OfferId) => {
  try {
    const deletedOffer = await poolRequest()
      .input("OfferId", sql.VarChar, OfferId)
      .query("DELETE FROM Offers WHERE OfferId = @OfferId");
    console.log("Deleted offer:", deletedOffer);
    return deletedOffer;
  } catch (error) {
    console.error("Error deleting offer:", error);
    throw error;
  }
};
