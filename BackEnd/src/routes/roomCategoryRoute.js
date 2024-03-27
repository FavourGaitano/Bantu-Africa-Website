import { Router } from 'express';
import { createRoomCategoryController, deleteRoomCategoryController, findRoomCategory, getCategoriesByNameAndSizeController, getCategoriesByNameController, getCategoriesByNameSizeAndMealPlanController, getCategoriesController, getPriceByNameSizeAndMealPlanController, getPriceController, getRoomCategroryByIdController, softDeleteRoomCategoryController, updateRoomCategoryController } from '../controllers/roomCategoryController.js';
const roomCategoryRouter = Router();

roomCategoryRouter.post("/category", findRoomCategory);
roomCategoryRouter.get("/rooms/category", getCategoriesController);
roomCategoryRouter.post("/rooms/category", createRoomCategoryController);
roomCategoryRouter.post("/rooms/category/price", getPriceController);
roomCategoryRouter.get('/rooms/category/name/:name', getCategoriesByNameController);
roomCategoryRouter.post('/rooms/category/mealplan', getCategoriesByNameSizeAndMealPlanController);
roomCategoryRouter.post('/rooms/category/name/price', getPriceByNameSizeAndMealPlanController);
roomCategoryRouter.post('/rooms/category/size', getCategoriesByNameAndSizeController);

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
