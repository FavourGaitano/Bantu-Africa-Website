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
  

  
  export const getPriceByNameMealPlanAndSize = async (Name, MealPlan, Size) => {
    try {
      const query = `
        SELECT Price
        FROM RoomCategory
        WHERE Name = @Name
          AND MealPlan = @MealPlan
          AND Size = @Size;
      `;
  
      const result = await poolRequest()
        .input("Name", sql.VarChar, Name)
        .input("MealPlan", sql.VarChar, MealPlan)
        .input("Size", sql.VarChar, Size)
        .query(query);
  
      if (result.recordset.length === 0) {
        throw new Error("No price found for the specified room category, meal plan, and size.");
      }
  
      return result.recordset[0].Price;
    } catch (error) {
      throw new Error(`Error retrieving price: ${error.message}`);
    }
  };
  
 


export const getRoomCategoryByIdService = async (RoomCategoryId) => {
  try {
    const singleReturnedRoom = await poolRequest()
      .input("RoomCategoryId", sql.VarChar, RoomCategoryId)
      .query(
        "SELECT * FROM RoomCategory WHERE RoomCategoryId = @RoomCategoryId"
      );
    return singleReturnedRoom;
  } catch (error) {
    console.error("Error fetching single room category:", error);
    throw error;
  }
};

export const findRoomCategoryService = async ({ Name, MealPlan, Size }) => {
  try {
    const existingCategory = await poolRequest()
      .input("Name", sql.VarChar, Name)
      .input("MealPlan", sql.VarChar, MealPlan)
      .input("Size", sql.VarChar, Size)
      .query(
        "SELECT * FROM RoomCategory WHERE Name = @Name AND MealPlan = @MealPlan AND Size = @Size"
      );
    console.log("Existing: ", existingCategory);
    return existingCategory.recordset[0];
  } catch (error) {
    console.error("Error finding room category:", error);
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
      .query(`UPDATE RoomCategory SET Name = @Name, Price = @Price,Size = @Size,MealPlan = @MealPlan
                 WHERE RoomCategoryId = @RoomCategoryId`);

    console.log("updated category", result);
    return result;
  } catch (error) {
    return error.message;
  }
};

export const RoomCategorysoftDeleteService = async (RoomCategoryId) => {
  try {
    const result = await poolRequest()
      .input("RoomCategoryId", sql.VarChar, RoomCategoryId)
      .query(
        "UPDATE RoomCategory SET IsDeleted = 1 WHERE RoomCategoryId = @RoomCategoryId"
      );
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
