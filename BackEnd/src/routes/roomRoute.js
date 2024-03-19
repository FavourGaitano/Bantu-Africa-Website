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
roomRouter.delete("/rooms/:RoomId", deleteRoomController);

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
>>>>>>> 5e662e46c37e8d0a61ba79cafe6c3b9d6c390b95
