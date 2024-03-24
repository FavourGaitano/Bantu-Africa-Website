import {
  sendNotFound,
  sendServerError,
  sendCreated,
  sendDeleteSuccess,
  sendBadRequest,
} from "../helper/helperFunctions.js";
import {
  addRoomService,
  deleteRoomService,
  getAvailableRoomService,
  getRoomByIdService,
  getRoomByRoomNumberService,
  getRoomsService,
  isAvailableService,
  softDeleteService,
  updateRoomService,
} from "../services/roomService.js";
import {
  roomValidator,
  updateRoomValidator,
} from "../validators/roomValidator.js";
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
      let existingRoom = await getRoomByRoomNumberService(RoomNumber);
      console.log(existingRoom);
      if (existingRoom) {
        sendBadRequest(
          res,
          `Room ${RoomNumber} already exists. Please assign another room number.`
        );
        return;
      }
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
    console.log("singleroom", singleroom);
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

export const markRoomUnavailableController = async (req, res) => {
  const { RoomId } = req.params;

  try {
    const result = await isAvailableService(RoomId);

    if (!result) {
      return res.status(404).send("Room not found");
    }

    res.status(200).send("Room marked as unavailable");
  } catch (error) {
    console.error("Error marking room as unavailable:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getAvailableRoomController = async (req, res) => {
  try {
    const availableRooms = await getAvailableRoomService();
    console.log(availableRooms, "availableRooms");
    if (!availableRooms || availableRooms.rowAffected == 0) {
      return res.status(404).send("No available rooms found");
    }

    res.status(200).json(availableRooms);
  } catch (error) {
    console.error("Error fetching available rooms:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateRoomController = async (req, res) => {
  try {
    const { RoomPhotoUrl, RoomNumber, Description, Occupants } = req.body;
    console.log("req.body", req.body);
    const { RoomId } = req.params;
    const { RoomCategoryId } = req.params;

    const { error } = updateRoomValidator({
      RoomPhotoUrl,
      RoomNumber,
      Description,
      Occupants,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      const checkExistingRoom = await getRoomByIdService(RoomId);
      if (checkExistingRoom.length === 0) {
        sendNotFound(res, "Room not found");
      } else {
        let room = {
          RoomPhotoUrl,
          RoomId,
          RoomCategoryId,
          RoomNumber,
          Description,
          Occupants,
        };
        console.log("room updated", room);
        const response = await updateRoomService(room);
        console.log("response", response);
        if (response.message) {
          sendServerError(res, response.message);
        } else {
          sendCreated(res, "Room updated successfully");
        }
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
    if (roomToDelete.rowsAffected === 0) {
      sendNotFound(res, "Room not found");
    } else {
      const result = await softDeleteService(roomId);
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
    console.log(error.message);
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
