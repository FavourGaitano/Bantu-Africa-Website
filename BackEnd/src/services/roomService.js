import { poolRequest, closePool, sql } from "../utils/dbConnect.js";

export const getRoomsService = async () => {
  try {
    const result = await poolRequest().query(`
        SELECT Room.*, RoomCategory.Name,RoomCategory.Size,RoomCategory.MealPlan,RoomCategory.Price
        FROM Room 
        INNER JOIN RoomCategory ON RoomCategory.RoomCategoryId = Room.RoomCategoryId
      `);
    return result.recordset;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const addRoomService = async (room) => {
  try {
    const result = await poolRequest()
      .input("RoomId", sql.VarChar, room.RoomId)
      .input("RoomPhotoUrl", sql.VarChar, room.RoomPhotoUrl)
      .input("RoomNumber", sql.Int, room.RoomNumber)
      .input("Description", sql.VarChar, room.Description)
      .input("RoomCategoryId", sql.VarChar, room.RoomCategoryId)
      .input("OfferId", sql.VarChar, room.OfferId)
      .input("Occupants", sql.Int, room.Occupants)
      .input("CreatedAt", sql.DateTime, room.CreatedAt)
      .query(
        "INSERT INTO Room (RoomId, RoomPhotoUrl, RoomNumber, Description, RoomCategoryId, OfferId, Occupants, CreatedAt) VALUES (@RoomId, @RoomPhotoUrl, @RoomNumber, @Description, @RoomCategoryId, @OfferId, @Occupants, @CreatedAt)"
      );
    return result;
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};

export const getRoomByIdService = async (RoomId) => {
  try {
    const singleReturnedRoom = await poolRequest().input(
      "RoomId",
      sql.VarChar,
      RoomId
    )
      .query(`SELECT Room.*, RoomCategory.Name,RoomCategory.Size,RoomCategory.MealPlan,RoomCategory.Price

              FROM Room 
              INNER JOIN RoomCategory ON RoomCategory.RoomCategoryId = Room.RoomCategoryId
              WHERE RoomId = @RoomId`);
    // console.log("single", singleReturnedRoom.recordset[0]);
    return singleReturnedRoom.recordset;
  } catch (error) {
    console.error("Error fetching single room:", error);
    throw error;
  }
};

export const getRoomByRoomNumberService = async (RoomNumber) => {
  try {
    const returnedRoom = await poolRequest().input(
      "RoomNumber",
      sql.Int,
      RoomNumber
    )
      .query(`SELECT Room.*, RoomCategory.Name,RoomCategory.Size,RoomCategory.MealPlan,RoomCategory.Price

              FROM Room 
              INNER JOIN RoomCategory ON RoomCategory.RoomCategoryId = Room.RoomCategoryId
              WHERE RoomNumber = @RoomNumber`);
    // console.log("single", singleReturnedRoom.recordset[0]);
    return returnedRoom.recordset[0];
  } catch (error) {
    console.error("Error fetching single room:", error);
    throw error;
  }
};

export const getAvailableRoomService = async () => {
  try {
    const availableRooms = await poolRequest()
      .query(`SELECT Room.*, RoomCategory.Name, RoomCategory.Size, RoomCategory.MealPlan, RoomCategory.Price
                   FROM Room 
                   INNER JOIN RoomCategory ON RoomCategory.RoomCategoryId = Room.RoomCategoryId
                   WHERE Room.isAvailable = 1`);
    console.log(availableRooms.recordset);
    return availableRooms.recordset;
  } catch (error) {
    console.error("Error fetching available rooms:", error);
    throw error;
  }
};

export const getRoomsAvailableForBookingService = async (Booking) => {
  const { Name, Size, StartDate, EndDate } = Booking;
  try {
    const availableRooms = await poolRequest()
      .input("Name", sql.VarChar(255), Name)
      .input("Size", sql.VarChar(255), Size)
      .input("StartDate", sql.Date, StartDate)
      .input("EndDate", sql.Date, EndDate)
      .query(`SELECT r.RoomId, r.RoomNumber, rc.*
          FROM Room r
          INNER JOIN RoomCategory rc ON r.RoomCategoryId = rc.RoomCategoryId
          WHERE r.isAvailable = 1
          AND r.IsDeleted = 0
          AND rc.Name=@Name
          AND rc.Size=@Size
          AND NOT EXISTS (
              SELECT 1
              FROM Bookings b
              WHERE b.RoomId = r.RoomId
              AND NOT (
                  b.EndDate < @StartDate OR
                  b.StartDate > @EndDate
              )
          )
          `);
    console.log(availableRooms.recordset);
    return availableRooms.recordset;
  } catch (error) {
    console.error("Error fetching available rooms:", error);
    throw error;
  }
};

export const updateRoomService = async (updateRoom) => {
  try {
    const result = await poolRequest()
      .input("RoomId", sql.VarChar, updateRoom.RoomId)
      .input("RoomPhotoUrl", sql.VarChar, updateRoom.RoomPhotoUrl)
      .input("RoomNumber", sql.Int, updateRoom.RoomNumber)
      .input("Description", sql.VarChar, updateRoom.Description)
      .input("RoomCategoryId", sql.VarChar, updateRoom.RoomCategoryId)
      .input("Occupants", sql.Int, updateRoom.Occupants)
      .query(
        "UPDATE Room SET RoomPhotoUrl = @RoomPhotoUrl, RoomNumber = @RoomNumber, Description = @Description, Occupants = @Occupants WHERE RoomId = @RoomId AND RoomCategoryId=@RoomCategoryId"
      );
    console.log("Updated room one:", result);
    return result;
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
};

export const softDeleteService = async (RoomId) => {
  try {
    const result = await poolRequest()
      .input("RoomId", sql.VarChar, RoomId)
      .query("UPDATE Room SET IsDeleted = 1 WHERE RoomId = @RoomId");
    console.log("Soft deleted room:", result);
    return result;
  } catch (error) {
    console.error("Error soft deleting room:", error.message);
    throw error;
  }
};

export const isAvailableService = async (RoomId) => {
  try {
    const result = await poolRequest()
      .input("RoomId", sql.VarChar, RoomId)
      .query("UPDATE Room SET isAvailable = 0 WHERE RoomId = @RoomId");
    console.log("is available:", result);
    return result;
  } catch (error) {
    console.error("Error in checking the room availability:", error);
    throw error;
  }
};

export const deleteRoomService = async (RoomId) => {
  try {
    const deletedRoom = await poolRequest()
      .input("RoomId", sql.VarChar, RoomId)
      .query("DELETE FROM Room WHERE RoomId = @RoomId");
    console.log("Deleted room:", deletedRoom);
    return deletedRoom;
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
};
