import { Router } from 'express';
import { createRoomCategoryController, deleteRoomCategoryController, softDeleteRoomCategoryController } from '../controllers/roomCategoryController.js';
import { getRoomByIdController } from '../controllers/roomController.js';
const roomCategoryRouter = Router();


roomCategoryRouter.get('/rooms/category', ()=>{
    console.log("categories");
});

roomCategoryRouter.post('/rooms/category', createRoomCategoryController);
// roomCategoryRouter.put('/rooms/category/update/:RoomCategoryId', updateRoomCategoryController);
roomCategoryRouter.patch('/rooms/category/softdelete/:RoomCategoryId',softDeleteRoomCategoryController );
roomCategoryRouter.get('/rooms/category/:RoomCategoryId', getRoomByIdController);
roomCategoryRouter.delete('/rooms/category/:RoomCategoryId', deleteRoomCategoryController);



export default roomCategoryRouter;