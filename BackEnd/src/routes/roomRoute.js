import { Router } from "express";
import {
  createRoomController,
  deleteRoomController,
  getAvailableRoomController,
  getRoomByCategoryController,
  getRoomByIdController,
  getRoomsController,
  markRoomUnavailableController,
  softDeleteRoomController,
  updateRoomController,
} from "../controllers/roomController.js";
const roomRouter = Router();

roomRouter.get("/rooms", getRoomsController);
roomRouter.post("/rooms", createRoomController);
roomRouter.put("/rooms/update/:RoomId/:RoomCategoryId", updateRoomController);
roomRouter.patch("/rooms/softdelete/:RoomId", softDeleteRoomController);
roomRouter.patch("/rooms/create/available/:RoomId", markRoomUnavailableController);
roomRouter.get("/rooms/:RoomId", getRoomByIdController);
roomRouter.get("/rooms/all/category/:Name", getRoomByCategoryController);
roomRouter.get("/rooms/room/available", getAvailableRoomController);
roomRouter.delete("/rooms/delete/:RoomId", deleteRoomController);


export default roomRouter;
