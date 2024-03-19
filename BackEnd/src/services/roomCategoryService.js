import { poolRequest, closePool, sql } from "../utils/dbConnect.js";

export const getRoomCategoriesService = async () => {
    try {
      const result = await poolRequest().query(`SELECT * FROM RoomCategory`);
      return result.recordset;
    } catch (error) {
      console.error("Error fetching room categories:", error.error);
      throw error;
    }
  };
  
  export const addRoomCategoryService = async (roomCategory) => {
    try {
      const result = await poolRequest()
        .input("RoomCategoryId", sql.VarChar, roomCategory.RoomCategoryId)
        .input("Name", sql.VarChar, roomCategory.Name)
        .input("Price", sql.Int, roomCategory.Price)
        .input("Size", sql.VarChar, roomCategory.Size)
        .input("MealPlan", sql.VarChar, roomCategory.MealPlan)
        .query(
          "INSERT INTO RoomCategory (RoomCategoryId, Name, Price, Size, MealPlan) VALUES (@RoomCategoryId, @Name, @Price, @Size, @MealPlan)"
        );
      return result;
    } catch (error) {
      console.error("Error adding room category:", error);
      throw error;
    }
  };
  

  export const getRoomCategoryByIdService = async (RoomCategoryId) => {
    try {
      const singleReturnedRoom = await poolRequest()
        .input("RoomCategoryId", sql.VarChar, RoomCategoryId)
        .query("SELECT * FROM RoomCategory WHERE RoomCategoryId = @RoomCategoryId");
      return singleReturnedRoom.recordset;
    } catch (error) {
      console.error("Error fetching single room category:", error);
      throw error;
    }
  };
  


  export const updateRoomCategoryService = async (updateRoomCategory) => {
    try {
      const result = await poolRequest()
        .input("RoomCategoryId", sql.VarChar, updateRoomCategory.RoomCategoryId)
        .input("Name", sql.VarChar, updateRoomCategory.Name)
        .input("Price", sql.Int, updateRoomCategory.Price)
        .input("Size", sql.VarChar, updateRoomCategory.Size)
        .input("MealPlan", sql.VarChar, updateRoomCategory.MealPlan)
        .query(
          "UPDATE RoomCategory SET Name = @Name, Price = @Price, Size = @Size, MealPlan = @MealPlan WHERE RoomCategoryId = @RoomCategoryId"
        );
      console.log("Updated room category:", result);
      return result;
    } catch (error) {
      console.error("Error updating room category:", error);
      throw error;
    }
  };
  

  export const RoomCategorysoftDeleteService = async (softdelete) => {
    try {
      const result = await poolRequest()
        .input("RoomCategoryId", sql.VarChar, softdelete.RoomId)
        .query("UPDATE RoomCategory SET IsDeleted = 1 WHERE RoomCategoryId = @RoomCategoryId");
      console.log("Soft deleted room category:", result);
      return result;
    } catch (error) {
      console.error("Error soft deleting room category", error);
      throw error;
    }
  };


export const deleteRoomCategoryService = async (RoomCategoryId) => {
    try {
      const deletedRoomCategory = await poolRequest()
        .input("RoomCategoryId", sql.VarChar, RoomCategoryId)
        .query("DELETE FROM RoomCategory WHERE RoomCategoryId = @RoomCategoryId");
      console.log("Deleted room category:", deletedRoomCategory);
      return deletedRoomCategory;
    } catch (error) {
      console.error("Error deleting room category:", error);
      throw error;
    }
  };
