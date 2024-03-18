import { sendNotFound, sendServerError, sendCreated, paginate, orderData } from '../helper/helperFunctions.js';
import { addRoomService, getRoomsService } from '../services/roomService.js';
import { roomValidator } from '../validators/roomValidator.js';
import {v4} from 'uuid';

export const getRooms = async (req, res) => {    
    try {
        const rooms = await getRoomsService();
        if (rooms.length === 0) {
            sendNotFound(res, 'No rooms found');
        } else {
            return res.status(200).json({rooms:rooms})
        }
    } catch (error) {
        sendServerError(res, error);
    }
}


export const createRoom = async (req, res) => {
    const { RoomPhotoUrl,RoomNumber,description,RoomCategoryId,OfferId,Occupants } = req.body;
    const { error } = roomValidator(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        try {
            const RoomId = v4();
            const CreatedAt=new Date()

            const newRoom = {
                RoomId,
                RoomPhotoUrl,
                RoomNumber,
                description,
                RoomCategoryId,
                OfferId,
                Occupants,
                CreatedAt
            }
            let response = await addRoomService(newRoom);
            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, 'Room created successfully');
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
    }
}


export const getRoomsService = async () => {
    try {
      const result = await poolRequest().query(`
          SELECT Room.*, RoomCategory.*
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
        .input("description", sql.VarChar, room.description)
        .input("RoomCategoryId", sql.VarChar, room.RoomCategoryId)
        .input("OfferId", sql.VarChar, room.OfferId)
        .input("Occupants", sql.VarChar, room.Occupants)
        .input("CreatedAt", sql.DateTime, room.CreatedAt)
        .query(
          "INSERT INTO Room (RoomId, RoomPhotoUrl, RoomNumber, description, RoomCategoryId, OfferId, Occupants, CreatedAt) VALUES (@RoomId, @RoomPhotoUrl, @RoomNumber, @description, @RoomCategoryId, @OfferId, @Occupants, @CreatedAt)"
        );
      return result;
    } catch (error) {
      console.error("Error adding room:", error);
      throw error;
    }
  };
  
  export const getSingleRoomService = async (singleRoom) => {
    try {
      const singleReturnedRoom = await poolRequest()
        .input("RoomId", sql.VarChar, singleRoom.RoomId)
        .query(`SELECT Room.*, RoomCategory.*
                FROM Room 
                INNER JOIN RoomCategory ON RoomCategory.RoomCategoryId = Room.RoomCategoryId
                WHERE RoomId = @RoomId`);
      return singleReturnedRoom;
    } catch (error) {
      console.error("Error fetching single room:", error);
      throw error;
    }
  };
  
  export const updateRoomService = async (updateRoom) => {
    try {
      const result = await poolRequest()
        .input("RoomId", sql.VarChar, updateRoom.RoomId)
        .input("RoomPhotoUrl", sql.VarChar, updateRoom.RoomPhotoUrl)
        .input("RoomNumber", sql.Int, updateRoom.RoomNumber)
        .input("description", sql.VarChar, updateRoom.description)
        .input("RoomCategoryId", sql.VarChar, updateRoom.RoomCategoryId)
        .input("OfferId", sql.VarChar, updateRoom.OfferId)
        .input("Occupants", sql.VarChar, updateRoom.Occupants)
        .query(
          "UPDATE Room SET RoomPhotoUrl = @RoomPhotoUrl, RoomNumber = @RoomNumber, description = @description, RoomCategoryId = @RoomCategoryId, OfferId = @OfferId, Occupants = @Occupants WHERE RoomId = @RoomId"
        );
      console.log("Updated room:", result);
      return result;
    } catch (error) {
      console.error("Error updating room:", error);
      throw error;
    }
  };
  
  export const softDeleteService = async (softdelete) => {
    try {
      const result = await poolRequest()
        .input("RoomId", sql.VarChar, softdelete.RoomId)
        .query("UPDATE Room SET IsDeleted = 1 WHERE RoomId = @RoomId");
      console.log("Soft deleted room:", result);
      return result;
    } catch (error) {
      console.error("Error soft deleting room:", error);
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