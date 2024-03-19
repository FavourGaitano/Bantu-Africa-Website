import { Router } from 'express';
import { createActivity } from '../controllers/activityController.js';

const activityRouter = Router();

activityRouter.post('/activity', createActivity);


export default activityRouter;


