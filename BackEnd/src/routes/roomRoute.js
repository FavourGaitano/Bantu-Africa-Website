import { Router } from "express";
import {
  createRoomController,
  deleteRoomController,
  getAvailableRoomController,
  getRoomByIdController,
  getRoomsController,
  softDeleteRoomController,
  updateRoomController,
} from "../controllers/roomController.js";
const roomRouter = Router();

roomRouter.get("/rooms", getRoomsController);
roomRouter.post("/rooms", createRoomController);
roomRouter.put("/rooms/update/:RoomId/:RoomCategoryId", updateRoomController);
roomRouter.patch("/rooms/softdelete/:RoomId", softDeleteRoomController);
roomRouter.get("/rooms/:RoomId", getRoomByIdController);
roomRouter.get("/rooms/:RoomId", getAvailableRoomController);
roomRouter.delete("/rooms/delete/:RoomId", deleteRoomController);

<<<<<<< HEAD
roomRouter.get('/rooms', getRoomsController);
roomRouter.post('/rooms', createRoomController);
roomRouter.put('/rooms/update/:RoomId/:RoomCategoryId', updateRoomController);
roomRouter.patch('/rooms/softdelete/:RoomId', softDeleteRoomController);
roomRouter.get('/rooms/:RoomId', getRoomByIdController);
roomRouter.get('/rooms/:RoomId', getAvailableRoomController);
roomRouter.delete('/rooms/delete/:RoomId', deleteRoomController);


export default roomRouter;

=======
export default roomRouter;
>>>>>>> 94e513ef0071eb1f8b8147934bbdc58e27567956
