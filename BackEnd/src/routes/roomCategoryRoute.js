<<<<<<< HEAD
import { Router } from 'express';
import { createRoomCategoryController, deleteRoomCategoryController, getCategoriesController, getPriceController, getRoomCategroryByIdController, softDeleteRoomCategoryController, updateRoomCategoryController } from '../controllers/roomCategoryController.js';
=======
import { Router } from "express";
import {
  createRoomCategoryController,
  deleteRoomCategoryController,
  findRoomCategory,
  getCategoriesController,
  getRoomCategroryByIdController,
  softDeleteRoomCategoryController,
  updateRoomCategoryController,
} from "../controllers/roomCategoryController.js";
>>>>>>> 8cfe5e9a73f438a1a7d6a84babfe1fed20734e40
const roomCategoryRouter = Router();

roomCategoryRouter.post("/category", findRoomCategory);
roomCategoryRouter.get("/rooms/category", getCategoriesController);
roomCategoryRouter.post("/rooms/category", createRoomCategoryController);
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

<<<<<<< HEAD
roomCategoryRouter.get('/rooms/category', getCategoriesController);
roomCategoryRouter.post('/rooms/category', createRoomCategoryController);
roomCategoryRouter.post('/rooms/category/price', getPriceController);
roomCategoryRouter.put('/rooms/category/update/:RoomCategoryId', updateRoomCategoryController);
roomCategoryRouter.patch('/rooms/category/softdelete/:RoomCategoryId',softDeleteRoomCategoryController);
roomCategoryRouter.get('/rooms/category/:RoomCategoryId', getRoomCategroryByIdController);
roomCategoryRouter.delete('/rooms/category/:RoomCategoryId', deleteRoomCategoryController);



export default roomCategoryRouter;
=======
export default roomCategoryRouter;
>>>>>>> 8cfe5e9a73f438a1a7d6a84babfe1fed20734e40
