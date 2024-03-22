import {
  sendNotFound,
  sendServerError,
  sendCreated,
} from "../helper/helperFunctions.js";
import {
  addRoomService,
  deleteRoomService,
  getAvailableRoomService,
  getRoomByIdService,
  getRoomsService,
  softDeleteService,
  updateRoomService,
} from "../services/roomService.js";
import { roomValidator } from "../validators/roomValidator.js";
import { v4 } from "uuid";

export const getRoomsController = async (req, res) => {
  try {
    const rooms = await getRoomsService();
    if (rooms.length === 0) {
      sendNotFound(res, "No rooms found");
    } else {
      return res.status(200).json(rooms);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const createRoomController = async (req, res) => {
  const {
    RoomPhotoUrl,
    RoomNumber,
    Description,
    RoomCategoryId,
    OfferId,
    Occupants,
  } = req.body;
  const { error } = roomValidator(req.body);
  if (error) {
    // console.log("Error", error);
    return res.status(400).send(error.details[0].message);
  } else {
    try {
      const RoomId = v4();
      const CreatedAt = new Date();

      const newRoom = {
        RoomId,
        RoomPhotoUrl,
        RoomNumber,
        Description,
        RoomCategoryId,
        OfferId,
        Occupants,
        CreatedAt,
      };
      let response = await addRoomService(newRoom);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, "Room created successfully");
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  }
};

export const getRoomByIdController = async (req, res) => {
  try {
    const { RoomId } = req.params;
    const singleroom = await getRoomByIdService(RoomId);
    if (singleroom.length === 0) {
      sendNotFound(res, "Room not found");
    } else {
      console.log("singleroom", singleroom);
      res.status(200).json(singleroom);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getAvailableRoomController = async (req, res) => {
  const { RoomCategoryId } = req.body;
  const { RoomId } = req.params;
  try {
    const room = await getAvailableRoomService(RoomId, RoomCategoryId);
    console.log("room", room);
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: "Error fetching active room" });
  }
};

export const updateRoomController = async (req, res) => {
  try {
    const { RoomPhotoUrl, RoomNumber, Description, Occupants } = req.body;
    console.log("req.body", req.body);
    const { RoomId } = req.params;
    const { RoomCategoryId } = req.params;
    const checkExistingRoom = await getRoomByIdService(RoomId);
    if (checkExistingRoom.length === 0) {
      sendNotFound(res, "Room not found");
    } else {
      let room = {};

      if (RoomPhotoUrl !== undefined) {
        room.RoomPhotoUrl = RoomPhotoUrl;
      } else {
        room.RoomPhotoUrl = checkExistingRoom[0].RoomPhotoUrl;
      }
      if (RoomNumber !== undefined) {
        room.RoomNumber = RoomNumber;
      } else {
        room.RoomNumber = checkExistingRoom[0].RoomNumber;
      }
      if (description !== undefined) {
        room.description = description;
      } else {
        room.description = checkExistingRoom[0].description;
      }
      if (Occupants !== undefined) {
        room.Occupants = Occupants;
      } else {
        room.Occupants = checkExistingRoom[0].Occupants;
      }
      console.log("room checking", room);

      const response = await updateRoomService(
        { RoomId, RoomCategoryId },
        room
      );
      console.log("response", response);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, "Room updated successfully");
      }
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const softDeleteRoomController = async (req, res) => {
  try {
    const { roomId } = req.params;
    const roomToDelete = await getRoomByIdService(roomId);
    if (roomToDelete.length === 0) {
      sendNotFound(res, "Room not found");
    } else {
      const result = await softDeleteService({ RoomId: roomId });
      if (result.message) {
        sendServerError(res, result.message);
      } else {
        sendDeleteSuccess(
          res,
          `Room with id: ${roomId} was deleted successfully`
        );
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Error soft deleting room" });
  }
};

export const deleteRoomController = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const roomToDelete = await getRoomByIdService(roomId);
    if (roomToDelete.length === 0) {
      sendNotFound(res, "Room not found");
    } else {
      const response = await deleteRoomService(roomId);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendDeleteSuccess(
          res,
          `Room with id: ${roomId} was deleted successfully`
        );
      }
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
