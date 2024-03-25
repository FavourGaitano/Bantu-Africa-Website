import { sendNotFound, sendServerError, sendCreated, sendDeleteSuccess } from '../helper/helperFunctions.js';
import {v4} from 'uuid';
import { RoomCategorysoftDeleteService, addRoomCategoryService, deleteRoomCategoryService, findRoomCategoryService, getPriceByNameMealPlanAndSize, getRoomCategoriesService, getRoomCategoryByIdService, updateRoomCategoryService } from '../services/roomCategoryService.js';
import { roomCategoryValidator, updateCategoryRoomValidator } from '../validators/roomCategoryValidator.js';

export const getCategoriesController = async (req, res) => {
  try {
    const roomsCategory = await getRoomCategoriesService();
    if (roomsCategory.length === 0) {
      sendNotFound(res, "No room categories found");
    } else {
        try {
            const existingCategory = await findRoomCategoryService({ Name, MealPlan, Size });
            
            if (existingCategory) {
                return res.status(400).send('Category already exists.');
            }
            const RoomCategoryId = v4();

            const newRoomCategory = {
                RoomCategoryId,
                Name,
                MealPlan,
                Size,
                Price            }
            let response = await addRoomCategoryService(newRoomCategory);
            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, 'Room category created successfully');
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
    }
}
}

export const getPriceController=async(req, res)=>{
    try {
      const { Name, MealPlan, Size } = req.body;
  
      if (!Name || !MealPlan || !Size) {
        return res.status(400).json({ error: "Missing required parameters." });
      }
  
      const price = await getPriceByNameMealPlanAndSize(Name, MealPlan, Size);
  
      return res.status(200).json({ price });
    } catch (error) {
      console.error("Error in getPriceController:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
 
 

export const findRoomCategory = async (req, res) => {
  const { Name, MealPlan, Size } = req.body;

  try {
    const category = await findRoomCategoryService({ Name, MealPlan, Size });
    if (!category) {
      sendNotFound(res, "Room category not found");
      return;
    } else {
      return res.status(200).json(category);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const createRoomCategoryController = async (req, res) => {
  const { Name, MealPlan, Size, Price } = req.body;
  const { error } = roomCategoryValidator(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    try {
      const existingCategory = await findRoomCategoryService({
        Name,
        MealPlan,
        Size,
      });

      if (existingCategory) {
        return res.status(400).send("Category already exists.");
      }
      const RoomCategoryId = v4();

      const newRoomCategory = {
        RoomCategoryId,
        Name,
        MealPlan,
        Size,
        Price,
      };
      let response = await addRoomCategoryService(newRoomCategory);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, "Room category created successfully");
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  }
};

export const getRoomCategroryByIdController = async (req, res) => {
  try {
    const { RoomCategoryId } = req.params;
    const oneSingleCategory = await getRoomCategoryByIdService(RoomCategoryId);
    const roomCategory = oneSingleCategory.recordset;
    if (roomCategory.length === 0) {
      sendNotFound(res, "Room category not found");
    } else {
      res.status(200).json(roomCategory[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching single room category" });
  }
};

export const updateRoomCategoryController = async (req, res) => {
  try {
    const { Name, MealPlan, Size, Price } = req.body;
    const { RoomCategoryId } = req.params;

    const checkExistingRoom = await getRoomCategoryByIdService(RoomCategoryId);

    if (checkExistingRoom.length === 0) {
      return sendNotFound(res, "Room category not found");
    }

    const { error } = updateCategoryRoomValidator(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let roomCategory = {
      Name: Name !== undefined ? Name : checkExistingRoom[0].Name,
      MealPlan:
        MealPlan !== undefined ? MealPlan : checkExistingRoom[0].MealPlan,
      Size: Size !== undefined ? Size : checkExistingRoom[0].Size,
      Price: Price !== undefined ? Price : checkExistingRoom[0].Price,
    };

    console.log({ RoomCategoryId, ...roomCategory }, "roomCategory");
    const response = await updateRoomCategoryService({
      RoomCategoryId,
      ...roomCategory,
    });

    if (response.message) {
      sendServerError(res, response.message);
    } else {
      sendCreated(res, "Room category updated successfully");
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const softDeleteRoomCategoryController = async (req, res) => {
  try {
    const { RoomCategoryId } = req.params;
    const roomCategoryToDelete = await getRoomCategoryByIdService(
      RoomCategoryId
    );
    const deletedRoomCategory = roomCategoryToDelete.recordset;
    if (deletedRoomCategory.length === 0) {
      sendNotFound(res, "Room Category not found");
    } else {
      console.log("roomCategoryToDelete", deletedRoomCategory);
      const result = await RoomCategorysoftDeleteService(RoomCategoryId);
      console.log(result, "result");
      if (result.rowAffected > 0) {
        console.log("result category", result);
        if (result.message) {
          sendServerError(res, result.message);
        } else {
          sendDeleteSuccess(
            res,
            `Room category with id: ${RoomCategoryId} was deleted successfully`
          );
        }
      } else {
        res.status(500).json("Error in deleting");
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteRoomCategoryController = async (req, res) => {
  try {
    const RoomCategoryId = req.params.RoomCategoryId;
    const roomCategoryToDelete = await getRoomCategoryByIdService(
      RoomCategoryId
    );
    const deletedRoomCategory = roomCategoryToDelete.recordset;
    if (deletedRoomCategory.length === 0) {
      sendNotFound(res, "Room category not found");
    } else {
      const response = await deleteRoomCategoryService(RoomCategoryId);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendDeleteSuccess(
          res,
          `Room category with id: ${RoomCategoryId} was deleted successfully`
        );
      }
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
