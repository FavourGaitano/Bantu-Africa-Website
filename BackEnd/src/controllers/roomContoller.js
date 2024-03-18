import { sendNotFound, sendServerError, sendCreated, paginate, orderData } from '../helper/helperFunctions.js';
import { addRoomService, getRoomsService } from '../services/roomService.js';
import { roomValidator } from '../validators/roomValidator.js';
import {v4} from 'uuid';

export const getRooms = async (req, res) => {    
    try {
        const rooms = await getRoomsService();
        if (rooms.length === 0) {
            sendNotFound(res, 'No rooms found');
        } else {
            return res.status(200).json({rooms:rooms})
        }
    } catch (error) {
        sendServerError(res, error);
    }
}


export const createRoom = async (req, res) => {
    const { RoomName,RoomNumber,description,RoomCategory } = req.body;
    const { error } = roomValidator(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        try {
            const RoomID = v4();
            const CreatedAt=new Date()

            const newRoom = {
                RoomID,
                RoomName,
                RoomNumber,
                description,
                RoomCategory,
                CreatedAt
            }
            let response = await addRoomService(newRoom);
            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, 'Room created successfully');
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
    }
}

