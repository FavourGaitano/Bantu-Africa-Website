<<<<<<< HEAD
import { Router } from 'express';
import { createRoomCategoryController, deleteRoomCategoryController, findRoomCategory, getCategoriesController, getPriceController, getRoomCategroryByIdController, softDeleteRoomCategoryController, updateRoomCategoryController } from '../controllers/roomCategoryController.js';
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
>>>>>>> c335ed8f217674c353f55063c4c8d53047078678
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

<<<<<<< HEAD




=======
>>>>>>> c335ed8f217674c353f55063c4c8d53047078678
export default roomCategoryRouter;
