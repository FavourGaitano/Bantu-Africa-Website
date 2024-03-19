import { poolRequest, closePool, sql } from "../utils/dbConnect.js";

export const getRoomsService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM tbl_room");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const addRoomService = async (room) => {
  try {
    const result = await poolRequest()
      .input("RoomID", sql.VarChar, room.RoomID)
      .input("RoomName", sql.VarChar, room.RoomName)
      .input("RoomNumber", sql.Int, room.RoomNumber)
      .input("description", sql.VarChar, room.description)
      .input("RoomCategory", sql.VarChar, room.RoomCategory)
      .input("CreatedAt", sql.DateTime, room.CreatedAt)
      .query(
        "INSERT INTO tbl_room (RoomID, RoomName, RoomNumber, description, RoomCategory, CreatedAt) VALUES (@RoomID, @RoomName, @RoomNumber, @description, @RoomCategory, @CreatedAt)"
      );
    return result;
  } catch (error) {
    return error;
  }
};
