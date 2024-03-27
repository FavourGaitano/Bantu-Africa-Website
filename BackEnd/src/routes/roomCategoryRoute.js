import { Router } from 'express';
import { createRoomCategoryController, deleteRoomCategoryController, findRoomCategory, getCategoriesController, getPriceController, getRoomCategroryByIdController, softDeleteRoomCategoryController, updateRoomCategoryController } from '../controllers/roomCategoryController.js';
const roomCategoryRouter = Router();

roomCategoryRouter.post("/category", findRoomCategory);
roomCategoryRouter.get("/rooms/category", getCategoriesController);
roomCategoryRouter.post("/rooms/category", createRoomCategoryController);
roomCategoryRouter.post('/rooms/category/price', getPriceController);

roomCategoryRouter.put(
  "/rooms/category/update/:RoomCategoryId",
  updateRoomCategoryController
);
roomCategoryRouter.patch(
  "/rooms/category/softdelete/:RoomCategoryId",
  softDeleteRoomCategoryController
);
roomCategoryRouter.get(
  "/rooms/category/:RoomCategoryId",
  getRoomCategroryByIdController
);
roomCategoryRouter.delete(
  "/rooms/category/:RoomCategoryId",
  deleteRoomCategoryController
);


export default roomCategoryRouter;
