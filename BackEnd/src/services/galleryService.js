import { poolRequest, closePool, sql } from "../utils/dbConnect.js";

export const getGalleryService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Gallery");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const getPicturebyCategoryService = async (categoryName) => {
  console.log("Name ya category:", categoryName)
  try {
    const result = await poolRequest()
    .input("categoryName", sql.VarChar(255), categoryName)
    .query("SELECT * FROM Gallery WHERE Category = @categoryName");
    console.log("Category:", result.recordset)
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};



export const getonepictureService = async (PictureId) => {
  try {
    const result = await poolRequest()
      .input("PictureId", sql.VarChar, PictureId)
      .query("SELECT * FROM Gallery WHERE PictureId = @PictureId");

    return result.recordset[0];
  } catch (error) {
    console.log("Error fetching  one Picture Service: ", error);
    throw error;
  }
};

export const deletePictureService = async (PictureId) => {
  try {
    const result = await poolRequest().input(
      "PictureId",
      sql.VarChar,
      PictureId
    ).query(`
              DELETE FROM Gallery
              WHERE PictureId = @PictureId
          `);

    return result;
  } catch (error) {
    console.error("Error in deleting Gallery Picture Service:", error);
    return error;
  }
};

export const updateGalleryService = async (PictureId, updatedFields) => {
  try {
    const response = await poolRequest()
      .input("PictureId", sql.VarChar, PictureId)
      .input("Description", sql.VarChar, updatedFields.Description)
      .input("Category", sql.VarChar, updatedFields.Category)
      .input("PictureUrl", sql.VarChar, updatedFields.PictureUrl)
      .query(`UPDATE Gallery 
              SET Description = @Description,
                  Category = @Category,
                  PictureUrl = @PictureUrl
              WHERE PictureId = @PictureId`);

    return response;
  } catch (error) {
    console.error("Error updating gallery Picture:", error);
    throw error;
  }
};

export const uploadPictureService = async (Gallery) => {
  try {
    const result = await poolRequest()
      .input("PictureId", sql.VarChar, Gallery.PictureId)
      .input("Description", sql.VarChar, Gallery.Description)
      .input("Category", sql.VarChar, Gallery.Category)
      .input("PictureUrl", sql.VarChar, Gallery.PictureUrl)
      .query(
        "INSERT INTO Gallery (PictureId, Description, Category, PictureUrl) VALUES (@PictureId, @Description, @Category, @PictureUrl)"
      );
    return result;
  } catch (error) {
    console.error("Error in uploadPictureService:", error);
    throw error;
  }
};
