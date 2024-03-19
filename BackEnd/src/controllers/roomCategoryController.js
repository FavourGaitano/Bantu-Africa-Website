import { sendNotFound, sendServerError, sendCreated } from '../helper/helperFunctions.js';
import {v4} from 'uuid';
import { RoomCategorysoftDeleteService, addRoomCategoryService, deleteRoomCategoryService, getRoomCategoriesService, getRoomCategoryByIdService } from '../services/roomCategoryService.js';
import { roomCategoryValidator } from '../validators/roomCategoryValidator.js';

export const getCategoriesController = async (req, res) => {    
    try {
        const roomsCategory = await getRoomCategoriesService();
        if (roomsCategory.length === 0) {
            sendNotFound(res, 'No room categories found');
        } else {
            // let result=roomsCategory.recordset
            return res.status(200).json(roomsCategory)
        }
    } catch (error) {
        sendServerError(res, error);
    }
}



export const createRoomCategoryController = async (req, res) => {
    const { Name,MealPlan,Size,Price } = req.body;
    const { error } = roomCategoryValidator(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        try {
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

 
  export const getRoomCategroryByIdController = async (req, res) => {
    try {
        const {RoomCategoryId} = req.params; 
      const roomCategory = await getRoomCategoryByIdService(RoomCategoryId);
      if (roomCategory.length === 0) {
        sendNotFound(res, 'Room category not found');
    } else {
        res.status(200).json(roomCategory);
    }
      res.json(room);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching single room category' });
    }
  };
  
 
  export const updateRoomCategoryController = async (req, res) => {
    try {
        const {RoomCategoryId}=req.params
        const checkExistingRoom = await getRoomCategoryByIdService(RoomCategoryId);
        if (checkExistingRoom.length === 0) {
            sendNotFound(res, 'Room category not found');
        } else {
            let roomCategory = {};
            const {RoomCategoryId,
                Name,
                MealPlan,
                Size,
                Price  } = req.body;
          
            if (Name !== undefined) {
                roomCategory.Name = Name;
            } else {
                roomCategory.Name = checkExistingRoom[0].Name;
            }
            if (MealPlan !== undefined) {
                roomCategory.MealPlan = MealPlan;
            } else {
                roomCategory.MealPlan = checkExistingRoom[0].MealPlan;
            }  if (Size !== undefined) {
                roomCategory.Size = Size;
            } else {
                roomCategory.Size = checkExistingRoom[0].Size;
            }  if (Price !== undefined) {
                roomCategory.Price = Price;
            } else {
                roomCategory.Price = checkExistingRoom[0].Price;
            }
                        
            const response = await updateRoomService( RoomCategoryId,roomCategory);
            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, 'Room category updated successfully');
            }
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
}
  
  
  export const softDeleteRoomCategoryController = async (req, res) => {
    try {
        const {RoomCategoryId} = req.params;
        const roomCategoryToDelete = await getRoomCategoryByIdService(RoomCategoryId)
        if (roomCategoryToDelete.length === 0) {
            sendNotFound(res, 'Room Category not found');
        }else{
      const result = await RoomCategorysoftDeleteService(RoomCategoryId);
      if (result.message) {
        sendServerError(res, result.message);
    } else {
        sendDeleteSuccess(res, `Room category with id: ${RoomCategoryId} was deleted successfully`);
    }        }
    } catch (error) {
      res.status(500).json({ error: 'Error soft deleting room category' });
    }
  };
  

  export const deleteRoomCategoryController = async (req, res) => {
    try {
        const RoomCategoryId = req.params.RoomCategoryId;
        const roomCategoryToDelete = await getRoomCategoryByIdService(RoomCategoryId)
        if (roomCategoryToDelete.length === 0) {
            sendNotFound(res, 'Room category not found');
        } else {
            const response = await deleteRoomCategoryService(RoomCategoryId);
            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendDeleteSuccess(res, `Room category with id: ${RoomCategoryId} was deleted successfully`);
            }
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
}



