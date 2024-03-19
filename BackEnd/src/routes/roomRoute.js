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


<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 5c697d7940a04e2e56dd14bd3695fb574530a182
roomRouter.get('/rooms', getRoomsController);
roomRouter.post('/rooms', createRoomController);
roomRouter.put('/rooms/update/:RoomId/:RoomCategoryId', updateRoomController);
roomRouter.patch('/rooms/softdelete/:RoomId', softDeleteRoomController);
roomRouter.get('/rooms/:RoomId', getRoomByIdController);
roomRouter.get('/rooms/:RoomId', getAvailableRoomController);
roomRouter.delete('/rooms/delete/:RoomId', deleteRoomController);



export default roomRouter;
<<<<<<< HEAD
=======
export default roomRouter;
>>>>>>> 5e662e46c37e8d0a61ba79cafe6c3b9d6c390b95
=======

>>>>>>> 5c697d7940a04e2e56dd14bd3695fb574530a182
