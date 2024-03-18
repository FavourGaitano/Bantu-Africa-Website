import { Router } from 'express';
import { createRoom, getRooms } from '../controllers/roomContoller.js';
const roomRouter = Router();


roomRouter.get('/rooms', getRooms);
roomRouter.post('/rooms', createRoom);



export default roomRouter;