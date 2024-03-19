import { Router } from 'express';
import { createRoomController, deleteRoomController, getAvailableRoomController, getRoomByIdController, getRoomsController, softDeleteRoomController, updateRoomController } from '../controllers/roomContoller.js';
const roomRouter = Router();


roomRouter.get('/rooms', getRoomsController);
roomRouter.post('/rooms', createRoomController);
roomRouter.put('/rooms/update/:RoomId/:RoomCategoryId', updateRoomController);
roomRouter.patch('/rooms/softdelete/:RoomId', softDeleteRoomController);
roomRouter.get('/rooms/:RoomId', getRoomByIdController);
roomRouter.get('/rooms/:RoomId', getAvailableRoomController);
roomRouter.delete('/rooms/:RoomId', deleteRoomController);



export default roomRouter;