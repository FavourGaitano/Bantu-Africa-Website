import { Router } from 'express';
import { createRoomCategoryController, deleteRoomCategoryController, getCategoriesController, getRoomCategroryByIdController, softDeleteRoomCategoryController, updateRoomCategoryController } from '../controllers/roomCategoryController.js';
const roomCategoryRouter = Router();


roomCategoryRouter.get('/rooms/category', getCategoriesController);
roomCategoryRouter.post('/rooms/category', createRoomCategoryController);
roomCategoryRouter.put('/rooms/category/update/:RoomCategoryId', updateRoomCategoryController);
roomCategoryRouter.patch('/rooms/category/softdelete/:RoomCategoryId',softDeleteRoomCategoryController);
roomCategoryRouter.get('/rooms/category/:RoomCategoryId', getRoomCategroryByIdController);
roomCategoryRouter.delete('/rooms/category/:RoomCategoryId', deleteRoomCategoryController);



export default roomCategoryRouter;