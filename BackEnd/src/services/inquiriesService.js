import { poolRequest, sql } from "../utils/dbConnect.js";

export const createInquiriesService = async (newInquiry) => {
  try {
    const result = await poolRequest()
      .input("InquiryId", sql.VarChar(255), newInquiry.InquiryId)
      .input("Name", sql.VarChar(255), newInquiry.Name)
      .input("Email", sql.VarChar(255), newInquiry.Email)
      .input("Description", sql.VarChar, newInquiry.Description)
      .input("Status", sql.VarChar(255), newInquiry.Status)
      .query(
        "INSERT INTO Inquiries (InquiryId, Name, Email, Description, Status) VALUES (@InquiryId, @Name, @Email, @Description, @Status)"
      );
    return result;
  } catch (error) {
    return error;
  }
};

export const getInquiriesService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Inquiries");
    return result.recordset;
  } catch (error) {
    return error;
  }
};

export const getInquiriesByEmailService = async (Email) => {
  try {
    const result = await poolRequest()
      .input("Email", sql.VarChar(255), Email)
      .query("SELECT * FROM Inquiries WHERE Email = @Email");
    return result.recordset;
  } catch (error) {
    return error;
  }
};

export const getInquiriesByIdService = async (InquiryId) => {
  try {
    const result = await poolRequest()
      .input("InquiryId", sql.VarChar(255), InquiryId)
      .query("SELECT * FROM Inquiries WHERE InquiryId = @InquiryId");
    return result.recordset;
  } catch (error) {
    return error;
  }
};

export const updateInquiryService = async (InquiryId, updatedInquiry) => {
  const { Name, Email, Description, Status } = updatedInquiry;
  try {
    const result = await poolRequest()
      .input("InquiryId", sql.VarChar(255), InquiryId)
      .input("Name", sql.VarChar(255), Name)
      .input("Email", sql.VarChar(255), Email)
      .input("Description", sql.VarChar, Description)
      .input("Status", sql.VarChar(255), Status)
      .query(
        "UPDATE Inquiries SET Name=@Name, Email=@Email, Description=@Description, Status=@Status WHERE InquiryId=@InquiryId"
      );
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteInquiryService = async (InquiryId) => {
  try {
    await poolRequest()
      .input("InquiryId", sql.VarChar(255), InquiryId)
      .query("DELETE FROM Inquiries WHERE InquiryId=@InquiryId");
  } catch (error) {
    return error.message;
  }
};
